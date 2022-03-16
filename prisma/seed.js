const { prisma } = require('../src/server/utils/prisma');

const {
    createFakeAdmin,
    createFakeCompetition,
    createFakeCompetitors,
    createFakeSeasons,
    createFakeTeam,
    createFakeRound,
    createFakePlacement,
    createFakePositionMapping,
} = require('../src/server/utils/faker');

const MAX_NUMBER_ADMINS_TO_GENERATE = 2;
const MAX_NUMBER_COMPETITORS_TO_GENERATE = 10;
const MAX_NUMBER_SEASONS_TO_GENERATE = 2;
const MAX_TEAMS_TO_GENERATE = 5;
const MAX_ROUNDS_TO_GENERATE = 3;

const createAdmin = async () => {
    const admins = [];
    for (let i = 0; i < MAX_NUMBER_ADMINS_TO_GENERATE; i++) {
        const fakeAdmin = createFakeAdmin();
        const fakeCompetition = createFakeCompetition();
        const fakeCompetitors = createFakeCompetitors(
            MAX_NUMBER_COMPETITORS_TO_GENERATE
        );
        const fakeSeasons = createFakeSeasons(MAX_NUMBER_SEASONS_TO_GENERATE);
        const admin = await prisma.admin.create({
            data: {
                username: fakeAdmin.username,
                password: fakeAdmin.password,
                email: fakeAdmin.email,
                competition: {
                    create: {
                        title: fakeCompetition.title,
                        competitors: {
                            createMany: { data: fakeCompetitors },
                        },
                        seasons: {
                            createMany: { data: fakeSeasons },
                        },
                    },
                },
            },
            include: {
                competition: {
                    include: {
                        seasons: true,
                        competitors: true,
                    },
                },
            },
        });
        console.log('admin', admin);
        admins.push(admin);
    }

    return admins;
};

const createTeams = async (season) => {
    const teams = [];

    for (let i = 0; i < MAX_TEAMS_TO_GENERATE; i++) {
        const fakeTeam = createFakeTeam();
        const team = await prisma.team.create({
            data: {
                name: fakeTeam.name,
                season: {
                    connect: {
                        id: season.id,
                    },
                },
            },
        });
        console.log('team', team);
        teams.push(team);
    }
    return teams;
};

const createParticipants = async (season, competitors, teams) => {
    const participants = [];

    for (let i = 0; i < competitors.length; i++) {
        const participant = await prisma.participant.create({
            data: {
                season: {
                    connect: {
                        id: season.id,
                    },
                },
                competitor: {
                    connect: {
                        id: competitors[i].id,
                    },
                },
                team: {
                    connect: {
                        id: teams[
                            Math.floor(Math.random() * MAX_TEAMS_TO_GENERATE)
                        ].id,
                    },
                },
            },
        });
        console.log('participant', participant);
        participants.push(participant);
    }
    return participants;
};

const createRounds = async (season) => {
    const rounds = [];
    for (let i = 0; i < MAX_ROUNDS_TO_GENERATE; i++) {
        const fakeRound = createFakeRound();
        const round = await prisma.round.create({
            data: {
                title: fakeRound.title,
                startsAt: fakeRound.startsAt,
                season: {
                    connect: {
                        id: season.id,
                    },
                },
            },
        });
        console.log('round', round);
        rounds.push(round);
    }
    return rounds;
};

const createPlacements = async (participants, rounds) => {
    const placements = [];

    for (let i = 0; i < rounds.length; i++) {
        const positions = Array.from(
            { length: participants.length },
            (_, i) => i + 1
        ); //fills an array up to max of participants [1,2,3 ... participants.length]
        for (let j = 0; j < participants.length; j++) {
            const fakePosition = createFakePlacement(positions);
            const placement = await prisma.placement.create({
                data: {
                    position: fakePosition.position, //add fake position

                    participant: {
                        connect: {
                            id: participants[j].id,
                        },
                    },
                    round: {
                        connect: {
                            id: rounds[i].id,
                        },
                    },
                },
            });
            const index = positions.indexOf(fakePosition.position);
            positions.splice(index, 1);
            console.log('placement', placement);
            placements.push(placement);
        }
    }
    return placements;
};

const createPositionMappings = async (season, participants) => {
    const positions = Array.from(
        { length: participants.length },
        (_, i) => i + 1
    ); //fills an array up to max of participants [1,2,3 ... participants.length]
    const fakeMappings = createFakePositionMapping(positions);
    const positionMappings = [];
    for (let i = 0; i < fakeMappings.length; i++) {
        const positionMapping = await prisma.positionMapping.create({
            data: {
                position: fakeMappings[i].position,
                mapping: fakeMappings[i].mapping,
                season: {
                    connect: {
                        id: season.id,
                    },
                },
            },
        });
        console.log('positionMapping', positionMapping);
        positionMappings.push(positionMapping);
    }
    return positionMappings;
};

const seed = async () => {
    const admins = await createAdmin();
    for (let i = 0; i < admins.length; i++) {
        for (let j = 0; j < admins[i].competition[0].seasons.length; j++) {
            const competitors = admins[i].competition[0].competitors;
            const season = admins[i].competition[0].seasons[j];
            const rounds = await createRounds(season);
            const teams = await createTeams(season);
            const participants = await createParticipants(
                season,
                competitors,
                teams
            );
            await createPlacements(participants, rounds);
            await createPositionMappings(season, participants);
        }
    }
    process.exit(0);
};

seed()
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
    })
    .finally(() => process.exit(1));

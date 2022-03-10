const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { createFakeAdmin, createFakeCompetition, createFakeCompetitors, createFakeSeasons, createFakeTeam, createFakeRound } = require('../src/server/utils/faker');
const MAX_NUMBER_ADMINS_TO_GENERATE = 10;
const MAX_NUMBER_COMPETITORS_TO_GENERATE = 10;
const MAX_NUMBER_SEASONS_TO_GENERATE = 2;
const MAX_TEAMS_TO_GENERATE = 5;
const MAX_ROUNDS_TO_GENERATE = 3;

const createAdmin = async () => {
    const admins = [];
    for (let i = 0; i < MAX_NUMBER_ADMINS_TO_GENERATE; i++) {
        const fakeAdmin = createFakeAdmin();
        const fakeCompetition = createFakeCompetition();
        const fakeCompetitors = createFakeCompetitors(MAX_NUMBER_COMPETITORS_TO_GENERATE);
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
                            createMany: { data: fakeCompetitors }
                        },
                        seasons: {
                            createMany: { data: fakeSeasons }
                        }
                    },
                }
            },
            include: {
                competition: {
                    include: {
                        seasons: true,
                        competitors: true
                    }
                }
            }

        });

        admins.push(admin);
    }

    return admins
}

const createTeamsAndParticipants = async (season, competitors) => {
    //console.log("seasons", seasons)
    //console.log("competitors", competitors)
    const teams = [];
    const participants = [];
    for (let i = 0; i < MAX_TEAMS_TO_GENERATE; i++) {
        const fakeTeam = createFakeTeam();
        const team = await prisma.team.create({
            data: {
                name: fakeTeam.name,
                season: {
                    connect: {
                        id: season.id
                    }
                }
            }
        })
        console.log("team", team)
        teams.push(team);
    }
    for (let i = 0; i < competitors.length; i++) {
        const participant = await prisma.participant.create({
            data: {
                season: {
                    connect: {
                        id: season.id
                    }
                },
                competitor: {
                    connect: {
                        id: competitors[i].id
                    }
                },
                team: {
                    connect: {
                        id: teams[Math.floor(Math.random() * MAX_TEAMS_TO_GENERATE)].id
                    }
                }
            }
        })
        console.log("participant", participant);
        participants.push(participant);
    }

}

const createRounds = async (season) => {
    const rounds = [];
    for (let i = 0; i < MAX_ROUNDS_TO_GENERATE; i++) {
        const fakeRound = createFakeRound();
        const round = await prisma.rounds.create({
            data: {
                title: fakeRound.title,
                startsAt: fakeRound.startsAt,
                season: {
                    connect: {
                        id: season.id
                    }
                }
            }
        })
        console.log("round", round);
        rounds.push(round);
    }
    return rounds;

}


const seed = async () => {
    const admins = await createAdmin();
    for (let i = 0; i < admins.length; i++) {
        for (let j = 0; j < admins[i].competition[0].seasons.length; j++) {
            const competitors = admins[i].competition[0].competitors;
            const season = admins[i].competition[0].seasons[j];
            const rounds = await createRounds(season);
            await createTeamsAndParticipants(season, competitors, rounds);
        }
    }


    process.exit(0);
}

seed()
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
    })
    .finally(() => process.exit(1));
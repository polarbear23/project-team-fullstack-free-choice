const { prisma } = require('../utils/prisma');
const { seasonCreateSchema } = require('../utils/joi');

const { HTTP_RESPONSE } = require('../config');

const createSeason = async (req, res) => {
    const { error } = seasonCreateSchema.validate(req.body);

    if (error) {
        return res
            .status(HTTP_RESPONSE.BAD_REQUEST.CODE)
            .json({ error: error.details[0] });
    }

    const {
        title,
        competitionId,
        participants,
        teams,
        positionMappings,
        rounds,
    } = req.body;

    const createdSeason = await prisma.season.create({
        data: {
            title,
            competitionId: Number(competitionId),
        },
    });

    const seasonId = createdSeason.id;

    let connectedParticipants = [];

    for (let i = 0; i < participants.length; i++) {
        const connectedParticipant = await prisma.participant.create({
            data: {
                season: {
                    connect: {
                        id: seasonId,
                    },
                },

                competitor: {
                    connect: {
                        id: participants[i].competitorId,
                    },
                },
            },
        });
        connectedParticipants.push(connectedParticipant);
    }

    // for (let i = 0; i < req.body.teams.length; i++) {
    //     await prisma.team.create({
    //         data: {
    //             seasonId: seasonId,
    //             teams: {
    //                 connect: {
    //                     id: req.body.teams[i].id,
    //                 },
    //             },
    //         },
    //     });
    // }

    // for (let i = 0; i < req.body.participants.length; i++) {
    //     await prisma.participant.create({
    //         data: {
    //             seasonId: seasonId,
    //             competitor: {
    //                 connect: {
    //                     id: req.body.participants[i].id,
    //                 },
    //             },
    //         },
    //     });
    // }

    return res
        .status(HTTP_RESPONSE.OK.CODE)
        .json({ data: createdSeason, connectedParticipants });
};

const getSeasonById = async (req, res) => {
    const selectedSeason = await prisma.season.findUnique({
        where: {
            id: Number(req.params.id),
        },
    });

    return res.status(HTTP_RESPONSE.OK.CODE).json({ data: selectedSeason });
};

const getSeasonsByCompetition = async (req, res) => {
    let competitionId = req.params.id;

    const selectedSeasons = await prisma.season.findMany({
        where: {
            competitionId: Number(competitionId),
        },
    });

    return res
        .status(HTTP_RESPONSE.CREATED.CODE)
        .json({ data: selectedSeasons });
};

module.exports = {
    createSeason,
    getSeasonById,
    getSeasonsByCompetition,
};

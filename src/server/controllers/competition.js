const { prisma } = require('../utils/prisma');


const createCompetition = async (req, res) => {
    const { title, competitors } = req.body;

    const createdCompetition = await prisma.competition.create({
        data: {
            title: title,
            competitors: {
                createMany: {
                    data: competitors
                }
            }
        }
    });

    return res.json({ data: createdCompetition });
}

const getCompetitionById = async (req, res) => {
    const id = req.user.id;
    const competitions = await prisma.competition.findMany({
        where: {
            adminId: Number(id)
        },
        include: {

        }
    })

    return res.json({ data: competitions });
}

const getAllCompetitions = async (req, res) => {
    const competitions = await prisma.competition.findMany({
        include: {
            admin: true,
            competitors: true,
            seasons: {
                include: {
                    teams: {
                        include: {
                            participants: {
                                include: {
                                    placements: true
                                }
                            }
                        }
                    },
                    rounds: {
                        include: {
                            placements: true
                        }
                    },
                    positionMappings: true
                }
            },
        }
    });

    return res.json({ data: competitions });
}

module.exports = {
    getAllCompetitions,
    createCompetition,
    getCompetitionById
}
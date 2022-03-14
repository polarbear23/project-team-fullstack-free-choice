const { prisma } = require('../utils/prisma');

const createRound = async (req, res) => {
    const { title, startsAt, seasonId, placements } = req.body
    const createdRound = await prisma.round.create({
        data: {
            title: title,
            startsAt: startsAt,
            season: {
                connect: {
                    id: Number(seasonId)
                }
            },
            placements: {
                createMany: {
                    data: placements
                }
            }
        }
    });

    res.json({ data: createdRound });
}

const getAllRoundsBySeasonId = async (req, res) => {
    const { seasonId } = req.body
    const rounds = await prisma.round.findMany({
        where: {
            seasonId: Number(seasonId)
        }
    });

    res.json({ data: rounds });
}

const getRoundById = async (req, res) => {
    const { id } = req.body
    const round = await prisma.round.findUnique({
        where: {
            id: Number(id)
        }
    });

    res.json({ data: round });
}

const updateRoundById = async (req, res) => {
    const { title, startsAt, id } = req.body

    const updatedRound = await prisma.round.update({
        where: {
            id: Number(id)
        },
        data: {
            title: title,
            startsAt: startsAt,
        }
    });

    res.json({ data: updatedRound });
}

const deleteRoundById = async (req, res) => {
    const { id } = req.body
    const deletedRound = await prisma.round.delete({
        where: {
            id: Number(id)
        }
    })

    res.json({ data: deletedRound });
}

module.exports = {
    createRound,
    updateRoundById,
    deleteRoundById,
    getAllRoundsBySeasonId,
    getRoundById
}
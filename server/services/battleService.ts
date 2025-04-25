import db from "../db.js";
import { Creature, CreautureBase } from "../types/game/creature.js";
import { prisma } from "../prisma/prisma.js";

export class BattleService {
  async getTeamByPlayerId2(playerId: string) {
    const team = await prisma.team.findFirst({
      where: {
        playerId,
        isActive: true,
      },
      include: {
        creatures: {
          orderBy: { teamPosition: 'asc' },
          include: {
            creature: {
              include: {
                base: {
                  include: {
                    element: true,
                  },
                },
                attacks: {
                  orderBy: { slotIndex: 'asc' },
                  include: {
                    attackBase: {
                      include: {
                        element: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  
    if (!team) return [];
  
    const creatures = team.creatures.map((teamCreature) => {
      const { creature } = teamCreature;
      return {
        id: creature.id,
        nickName: creature.nickName,
        level: creature.level,
        xp: creature.xp,
        isActive: creature.isActive,
        base: {
          name: creature.base.name,
          spd: creature.base.spd,
          hp: creature.base.hp,
          atk: creature.base.atk,
          def: creature.base.def,
          variant: creature.base.variant,
          lore: creature.base.lore,
          element: creature.base.element?.name || null,
        },
        attacks: creature.attacks.map((atk) => ({
          id: atk.id,
          slotIndex: atk.slotIndex,
          usesLeft: atk.usesLeft,
          name: atk.attackBase.name,
          power: atk.attackBase.atk,
          type: atk.attackBase.type,
          baseUses: atk.attackBase.usesLeft,
          description: atk.attackBase.description,
          element: atk.attackBase.element?.name || null,
        })),
      };
    });
  
    return creatures;
  }
  

  async getTeamByPlayerId(userId: string) {
    const team = await prisma.team.findFirst({
      where: {
        playerId: userId,
        isActive: true,
      },
      include: {
        creatures: {
          include: {
            creature: {
              include: {
                base: {
                  include: {
                    element: true,
                  },
                },
                attacks: {
                  include: {
                    attackBase: {
                      include: {
                        element: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!team) throw new Error("No active team found for this player.");
  }
}

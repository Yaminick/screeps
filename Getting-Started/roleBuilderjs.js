var roleBuilder = {
        
    /** @param {Creep} creep **/
    run: function(creep) {
        var charging = true;
        
        if(creep.carry.energy < 5) {
            charging = true;
            creep.memory.building = false;
            console.log('Builder[' + creep.name + '] needs more energy!')
        } else if (creep.carry.energy == creep.carryCapacity) {
            charging = false;
            console.log('Builder[' + creep.name + '] is ready to build!')
            creep.memory.building = true;
        } else {
            
        }

        if(creep.memory.building) {
            creep.say('Beep Boop')
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else { //Idle
                creep.moveTo(Game.flags.Factory)
            }
        }
        else {
            creep.say('Energy Plz.')
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0);
                    }
            });
            var sources = creep.room.find(FIND_SOURCES);
            
            if (targets.length > 0 ) {
                if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else if (targets.length == 0 && sources.length > 0) {
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            } else { 
                creep.moveTo(Game.flags.Factory)
            }
            
        }
    }
};

module.exports = roleBuilder;
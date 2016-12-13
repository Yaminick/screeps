var roleHarvester = {
    

    /** @param {Creep} creep **/
    run: function(creep) {
        var isEmpty = true;
        var farming = false;
        var storing = false;
        
         if(farming && !storing && creep.carry.energy == 0) {
            storing = true
            farming = false
            console.log('Harvester[' + creep.name + '] enery is empty!')
        }
        if(!farming && storing && creep.carry.energy == creep.carryCapacity) {
            farming = true;
            storing = false
            console.log('Harvester[' + creep.name + '] energy is full!');
        }
        
        if(creep.carry.energy < creep.carryCapacity || creep.carry.energy == 0) {
            creep.say('Omnomnom')
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
                console.log('Harvester[' + creep.name + '] moving to Source[' + sources[0].id + ']');
            }
        }
        else {
            creep.say('Tank-Full!')
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_CONTAINER);
                    }
            });
            
            var emptyTargets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity;
                    }
            });
            
            var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] < structure.storeCapacity);
                    }
            });
            
            if(targets.length > 0) {
                if(creep.transfer(emptyTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(emptyTargets[0]);
                    console.log('Harvester[' + creep.name + '] moving to Target[' + targets[0].name + ']');
                } else {
                    if(creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containers[0])
                    }
                }
            }
        }
    }
};

module.exports = roleHarvester;

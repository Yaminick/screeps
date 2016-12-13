var roleMover = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
        var fetch = true;
        
        if(creep.carry.energy == 0) {
            fetch = true
        } else if (creep.carry.energy == creep.carryCapacity) {
            fetch = false
        }
        
        if((fetch && creep.carry.energy < creep.carryCapacity) || creep.carry.energy == 0) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION);
                    }
            });
            
            if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.say('Fetching!')
                creep.moveTo(targets[0]);
            }
        }
        else {
            creep.say('Tank-Full!')
            
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER && structure.energy < structure.energyCapacity);
                    }
            });
            
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                    console.log('Mover[' + creep.name + '] moving to Target[' + targets[0].name + ']');
                }
            }
        }
    }
};

module.exports = roleMover;

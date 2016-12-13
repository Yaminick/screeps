var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleMover = require('role.mover');

//var roleHarvester2 = require('role.harvester2');
//var roleUpgrader = require('role.upgrader');

//var roleMechanic = require('role.mechanic');

module.exports.loop = function () {
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var movers = _.filter(Game.creeps, (creep) => creep.memory.role == 'mover');
    //var harvesters2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester2');
    //var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    //var mechanics = _.filter(Game.creeps, (creep) => creep.memory.role == 'mechanic');
    //console.log('Harvesters: ' + harvesters.length + ' + ' + harvesters2.length + ' Upgraders: ' + upgraders.length + ' Builders: ' + builders.length + ' Mechanics: ' + mechanics.length);

    if(harvesters.length < 6) {
        //SPAWN HARVESTER
        var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], undefined, {role: 'harvester'});
        //console.log('Spawning new harvester: ' + newName);
    }
    if(harvesters.length > 5 && builders.length < 6) {
        //SPAWN BUILDER
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], undefined, {role: 'builder'});
        //console.log('Spawning new builder: ' + newName);
    }
    if(harvesters.length > 5 && movers.length < 1) {
        //SPAWN MOVER
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], undefined, {role: 'mover'});
        //console.log('Spawning new builder: ' + newName);
    }
    /*
    if(harvesters.length > 4 && harvesters2.length < 5) {
        //var newName = Game.spawns['D-Block'].createCreep([WORK, CARRY, CARRY, CARRY, MOVE], undefined, {role: 'harvester2'});
        //console.log('Spawning new harvester: ' + newName);
    }
    if(upgraders.length < 2) {
        //var newName = Game.spawns['D-Block'].createCreep([WORK, CARRY, CARRY, CARRY,MOVE], undefined, {role: 'upgrader'});
        //console.log('Spawning new upgrader: ' + newName);
    }
    if(mechanics.length < 1) {
        //var newName = Game.spawns['D-Block'].createCreep([WORK, CARRY, CARRY, CARRY,MOVE], undefined, {role: 'mechanic'});
        //console.log('Spawning new upgrader: ' + newName);
    }
    */
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'mover') {
            roleBuilder.run(creep);
        }
        /*
        if(creep.memory.role == 'harvester2') {
            roleHarvester2.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        
        if(creep.memory.role == 'mechanic') {
            roleMechanic.run(creep);
        }
        */
    }
}
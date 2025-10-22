class Robot {
    constructor(name) {
        this.name = name

    }

    move() {
        console.log(`${this.name} is moving`)
    }

}

const r0 = new Robot('some robot')
r0.move()

class Weapon {
    constructor(description) {
        this.description = description
    }

    fire() {
        console.log(`${this.description} is firing`)
    }
}

const w0 = new Weapon('laser')
w0.fire()

class CombatRobot extends Robot {
    constructor(name) {
        super(name)
        this.weapons = []
    }

    addWeapons(w) {
        this.weapons.push(w)
    }

    fire() {
        console.log('firing all weapons')
        this.weapons.forEach(element => {
            element.fire()
        });
    }
}

const r1 = new CombatRobot('some combat robot')
r1.addWeapons(w0)
r1.addWeapons(new Weapon('missile'))
r1.move()
r1.fire()

Robot.prototype.fly = function () {//Adaugă o nouă metodă fly() în prototipul clasei Robot, după ce clasa a fost deja definită.

 //Asta înseamnă că toate obiectele care provin din Robot (inclusiv cele din subclase, cum e CombatRobot) vor moșteni automat metoda fly.
    console.log(`${this.name} is flying`)
}

r1.fly()



//test 


class Software{
    constructor(name,version){
        this.name=name;
        this.version=version;
    }
    run(){
        console.log(`Running ${this.name} version ${this.version}`);
    }
}

s1=new Software('MyApp','1.0');
s1.run();

class Tab{
    constructor(url){
        this.url=url;
    }}
t0=new Tab('http://example.com');


class Browser extends Software{
    constructor(name,version){
        super(name,version);
        this.tabs=[];
    }
    addtab(tab){
        this.tabs.push(tab);
    }
    listtabs(){
        console.log(`Tabs in ${this.name}:`);
        this.tabs.forEach((tab,index)=>{
            console.log(`Tab ${index+1}: ${tab.url}`);
        });
    }
}
const b1=new Browser('MyBrowser','2.0');
b1.addtab(new Tab('http://example.com'));
b1.addtab(new Tab('http://another-example.com'));
b1.run();
b1.listtabs();


Browser.prototype.plugin=function(pluginName){
    console.log(`Plugin ${pluginName} added to ${this.name}`);
}
b1.plugin('AdBlocker');
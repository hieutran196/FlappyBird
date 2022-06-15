import { _decorator, Component, Node, Vec3, Event, EventTouch, EventKeyboard, input, Input, KeyCode, Collider2D, Contact2DType, IPhysics2DContact, PhysicsSystem2D } from 'cc';
import { GameStatus, MainControl } from './MainControl';
import { SoundType } from './SoundManager';
const { ccclass, property } = _decorator;

@ccclass('BirdControl')
export class BirdControl extends Component {

    speed:number = 0;

    @property(MainControl)
    mainControl: MainControl = null;

    onLoad(){
        input.on(Input.EventType.KEY_DOWN, this.onKeyBoardUp, this);
    }

    start(){
        let collider = this.getComponent(Collider2D);
        if(collider){
            console.log('register');
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContactCollision, this);
        }
    }

    onBeginContactCollision(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if(otherCollider.tag === 0){
            this.mainControl.soundManager.playSound(SoundType.Hit);
            this.mainControl.gameOver();
            this.speed = 0;
        }else if(otherCollider.tag === 1){
            this.mainControl.soundManager.playSound(SoundType.Score);
            this.mainControl.setScore();
        }
    }

    update(deltaTime: number) {
        if(this.mainControl.gameStatus != GameStatus.Playing)
            return;

        this.speed -= 0.05;
        this.node.setPosition(new Vec3(0, this.node.getPosition().y + this.speed, 0));
        var angle = -(this.speed/2)*30;
        if(angle>=30){
            angle = 30;
        }
        this.node.angle = -angle;
    }

    onKeyBoardUp(event: EventKeyboard){
        switch(event.keyCode){
            case KeyCode.SPACE:
                this.speed = 2;
                this.mainControl.soundManager.playSound(SoundType.Fly);
                break;
        }
    }
}


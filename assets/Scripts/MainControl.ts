import { _decorator, Component, Node, Sprite, Vec2, Vec3, Prefab, instantiate, math, director, PhysicsSystem2D, EPhysics2DDrawFlags, Button, Input, Label } from 'cc';
import { BirdControl } from './BirdControl';
import { SoundManager, SoundType } from './SoundManager';
const { ccclass, property } = _decorator;

export enum GameStatus{
    Ready = 0,
    Playing,
    GameOver
}

@ccclass('MainControl')
export class MainControl extends Component {
    @property(Sprite)
    spBg: Sprite[] = [null, null];
    @property(Sprite)
    spGround: Sprite[] = [null, null];

    @property(Prefab)
    pipePrefab: Prefab = null;
    @property(Node)
    gameOverPanel: Node = null;
    @property(Button)
    resetBtn: Button = null;

    arrPipe: Node[] = [null, null, null];
    gameStatus: GameStatus = GameStatus.Ready;

    @property(Button)
    startBtn: Button = null;

    @property(Label)
    scoreLabel: Label = null;

    @property(SoundManager)
    soundManager: SoundManager = null;

    curScore: number = 0;
    birdControl : BirdControl = null;

    onLoad(){
        this.gameOverPanel.active = false;
        this.resetBtn.node.on(Input.EventType.TOUCH_END, this.onResetBtnClicked, this);
        this.startBtn.node.on(Input.EventType.TOUCH_END, this.onStartBtnClicked, this);
        this.resetBtn.node.active = false;
        this.startBtn.node.active = true;
        this.birdControl = this.node.getChildByName('Bird').getComponent(BirdControl);
        this.birdControl.node.active = false;
    }

    start() {
        for(let i = 0; i < this.arrPipe.length; i++){
            this.arrPipe[i] = instantiate(this.pipePrefab);
            this.node.getChildByName('PipeContainer').addChild(this.arrPipe[i]);
            var minY = -120;
            var maxY = 120;
            this.arrPipe[i].setPosition(new Vec3(170 + 220 * i, minY + math.random() * maxY - minY, 0));
        }
    }

    update(deltaTime: number) {
        if(this.gameStatus != GameStatus.Playing)
            return;

        for(let i = 0; i < this.spBg.length; i++){
            var newPos = this.spBg[i].node.getPosition();
            newPos.x -= 1.0;
            if(newPos.x <= -288)
            {
                newPos.x = 288;
            }
            this.spBg[i].node.setPosition(newPos);
        }

        for(let i = 0; i < this.spGround.length; i++){
            var newPos = this.spGround[i].node.getPosition();
            newPos.x -= 1.0;
            if(newPos.x <= -336)
            {
                newPos.x = 336;
            }
            this.spGround[i].node.setPosition(newPos);
        }

        for(let i = 0; i < this.arrPipe.length; i++){
            var newPos = this.arrPipe[i].getPosition();
            newPos.x -= 1.0;
            if(newPos.x <= -170)
            {
                newPos.x = 430;
                var minY = -120;
                var maxY = 120;
                newPos.y = minY + Math.random() * (maxY - minY);
            }
            this.arrPipe[i].setPosition(newPos);
        }
    }

    setScore(){
        this.curScore++;
        this.scoreLabel.string = this.curScore.toString();
    }

    onStartBtnClicked(){
        this.startBtn.node.active = false;
        this.resetBtn.node.active = false;
        this.gameStatus = GameStatus.Playing;
        this.gameOverPanel.active = false;

        //Reset map
        this.birdControl.node.active = true;
        this.birdControl.node.setPosition(new Vec3(0,0,0));
        this.birdControl.node.angle = 0;
        
        for(let i = 0; i < this.arrPipe.length; i++){
            var newPos = this.arrPipe[i].getPosition();
            newPos.x = 170 + 220 * i
            var minY = -120;
            var maxY = 120;
            newPos.y = minY + Math.random() * (maxY - minY);
            this.arrPipe[i].setPosition(newPos);
        }

        //Score
        this.curScore = 0;
        this.scoreLabel.string = this.curScore.toString();
    }

    onResetBtnClicked(){
        this.startBtn.node.active = false;
        this.resetBtn.node.active = false;
        this.gameStatus = GameStatus.Playing;
        this.gameOverPanel.active = false;

        //Reset map
        this.birdControl.node.setPosition(new Vec3(0,0,0));
        this.birdControl.node.angle = 0;
        for(let i = 0; i < this.arrPipe.length; i++){
            var newPos = this.arrPipe[i].getPosition();
            newPos.x = 170 + 220 * i
            var minY = -120;
            var maxY = 120;
            newPos.y = minY + Math.random() * (maxY - minY);
            this.arrPipe[i].setPosition(newPos);
        }

        //Score
        this.curScore = 0;
        this.scoreLabel.string = this.curScore.toString();
    }

    gameOver(){
        this.gameOverPanel.active = true;
        this.resetBtn.node.active = true;
        this.gameStatus = GameStatus.GameOver;
        this.soundManager.playSound(SoundType.Die);
    }
}


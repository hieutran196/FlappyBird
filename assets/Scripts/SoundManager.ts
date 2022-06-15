import { _decorator, Component, Node, AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

export enum SoundType {
    Fly = 0,
    Score,
    Die,
    Hit
}

@ccclass('SoundManager')
export class SoundManager extends Component {
    @property(AudioSource)
     public audioSource: AudioSource = null!

    // sound effect when bird flying
    @property({type: AudioClip})
    flySound: AudioClip = null;

    @property({type: AudioClip})
    scoreSound: AudioClip = null;

    @property({type: AudioClip})
    hitSound: AudioClip = null;

    @property({type: AudioClip})
    dieSound: AudioClip = null;

    playSound(soundType: SoundType){
        switch(soundType){
            case SoundType.Fly:
                this.audioSource.playOneShot(this.flySound, 1);
                break;
            case SoundType.Score:
                this.audioSource.playOneShot(this.scoreSound, 1);
                break;
            case SoundType.Die:
                this.audioSource.playOneShot(this.dieSound, 1);
                break;
            case SoundType.Hit:
                this.audioSource.playOneShot(this.hitSound, 1);
                break;
        }
    }
}


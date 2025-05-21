# speech-to-lipsync

Convert speech audio into lipsync animation data for 2D/3D characters.

## ✨ Features

- 🎤 Convert audio to phoneme-based lipsync.(current support:jawOpen,oo-shape,ee-shape)
- 🎭 Output ready for facial rig blendshapes animation.
- 📦 Lightweight and easy to integrate
- 🎧 Uses [Meyda](https://www.npmjs.com/package/meyda) for low-level audio analysis
## 📦 Installation

```javascript
npm install speech-to-lipsync
```

## 📦 Three.js example


```javascript
import { SpeechToLipsync } from 'speech-to-lipsync';

const speechPlayer = new SpeechToLipsync({ intensity: 0.8 });

speechPlayer.onUpdate = (features) => {
                this.head.morphTargetInfluences[34] = THREE.MathUtils.lerp(this.head.morphTargetInfluences[34], threshold(features.jaw, 0.01, 1), 0.15)
            }

const audioLoader = new THREE.AudioLoader();
audioLoader.load('./assets/speech.mp3', (buffer) => {
            speechPlayer.setSource(buffer)
            speechPlayer.play()
            // speechPlayer.stop()
            // speechPlayer.replay()
        });
```

## Contributing

Please see from github
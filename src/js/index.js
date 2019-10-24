import engine from './mn/engine'
// import Scene from './scenes/scene';
import Scene from './scenes/simple-ball';

let scene = new Scene;

engine.scene = scene;
engine.initialize();
engine.run();

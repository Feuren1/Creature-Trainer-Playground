import './style.css'
import { AppState } from './types/appState.ts'
import styles from './main.module.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = /* html */ `
<div class="mainContainer">
<div class="topRow">
  <div class="column">Column 1</div>
  <div class="column">Column 2</div>
</div>
<div class="middleRow">
  <div class="column">Column 1</div>
  <div class="column">Column 2</div>
  <div class="column">Column 3</div>
</div>
<div class="bottomRow">
  <div class="column">Bottom Element</div>
</div>
</div>

`;

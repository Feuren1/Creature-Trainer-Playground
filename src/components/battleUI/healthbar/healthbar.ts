import styles from './healthbar.module.css'

export function HealthBar(currentHp: number, maxHp: number): HTMLDivElement {
    const healthbar = document.createElement("div");
    healthbar.className= styles.healthbar

    const hpText = document.createElement("p");
    hpText.className= styles.hpText
    hpText.textContent=(`${currentHp} / ${maxHp}`)
    
    const bar = document.createElement("div")
    bar.className = styles.bar

    const barFilling = document.createElement("div")
    barFilling.className = styles.barFilling

    const hpPercentage = (currentHp / maxHp) * 100;
    barFilling.style.width = `${hpPercentage}%`;
    
    bar.appendChild(barFilling)
    healthbar.appendChild(bar)
    healthbar.appendChild(hpText)
    return healthbar;
}
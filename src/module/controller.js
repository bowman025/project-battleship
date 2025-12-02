import humanImg from '../img/human.svg';
import humanImg2 from '../img/human-2.svg';
import robotImg from '../img/robot.svg';
import { ComputerPlayer, Player } from './player.js';
import { initializeDialog } from './display';

export function initializePlayers(type) {
    const player1 = new Player('Player 1', 1);
    if (type === 'Human') {
        const player2 = new Player('Player 2', 2);
        return [player1, player2];
    } else if (type === 'Computer') {
        const comp = new ComputerPlayer('Player 2', 2);
        return [player1, comp];
    } else return false;
}

export function attack(player, coordinates) {
    return player.gameboard.receiveAttack(coordinates[1], coordinates[2]);
}

export function randomizeShips(player) {
    player.gameboard.placeShipsRandomly();
}

export function resetShips(player) {
    player.gameboard.resetBoard();
}

export function addShip(player, name, orientation, x, y) {
    const a = Number(x);
    const b = Number(y);
    return player.gameboard.placeShip(name, orientation, a, b);
}

const main = document.querySelector('main');

export function playRound(attacker, defender) {
    const changeover = document.createElement('div');
    changeover.classList.add('changeover');
    const msg = document.createElement('button');
    const msgImg = document.createElement('img');
    if (attacker.id === 1) msgImg.src = humanImg;
    else msgImg.src = humanImg2;
    msg.textContent = 'Take Over!';
    msg.prepend(msgImg);
    changeover.appendChild(msg);
    main.appendChild(changeover);
    let attackerShips = document.querySelectorAll(`.ship${attacker.id}`);
    attackerShips.forEach(ship => ship.classList.remove('invisible'));
    let attackerBoxes = document.querySelectorAll(`.box${attacker.id}`);
    attackerBoxes.forEach(box => box.classList.remove('hover-enabled'));
    let defenderShips = document.querySelectorAll(`.ship${defender.id}`);
    let defenderBoxes = document.querySelectorAll(`.box${defender.id}`);
    msg.addEventListener('click', () => {
        defenderShips.forEach(ship => ship.classList.add('invisible'));
        defenderBoxes.forEach(box => {
            box.classList.add('hover-enabled');
            box.addEventListener('click', () => {
                const coordinates = box.id.split(',');
                const status = attack(defender, coordinates);
                if (status === 'hit' || status === 'sunk') {
                    box.classList.add('hit');
                    if (status === 'sunk') {
                        const sunkMsg = document.createElement('div');
                        sunkMsg.classList.add('sunk-msg');
                        const opponentImg = document.createElement('img');
                        if (defender.id === 1) opponentImg.src = humanImg;
                        else if (defender.id === 2 && defender instanceof ComputerPlayer) opponentImg.src = robotImg;
                        else opponentImg.src = humanImg2;
                        sunkMsg.textContent = '\'s ship sunk!';
                        sunkMsg.prepend(opponentImg);
                        main.appendChild(sunkMsg);
                        setTimeout(() => {
                            main.removeChild(sunkMsg);
                        }, 1200);
                    }
                    if (defender.gameboard.checkSunk()) setTimeout(() => {
                        const ggDiv = document.createElement('div');
                        ggDiv.classList.add('gg');
                        const gameOverMsg = document.createElement('div');
                        gameOverMsg.textContent = 'GAME OVER!';
                        const gameOverText = document.createElement('div');
                        gameOverText.textContent = '\'s Fleet Has Been Sunk!';
                        const gameOverImg = document.createElement('img');
                        if (defender.id === 1) gameOverImg.src = humanImg;
                        else gameOverImg.src = humanImg2;
                        gameOverText.prepend(gameOverImg);
                        ggDiv.append(gameOverMsg, gameOverText);
                        const restart = document.createElement('button');
                        restart.classList.add('new-game-btn');
                        restart.textContent = 'New Game';
                        restart.addEventListener('click', () => {
                            initializeDialog();
                        });
                        main.replaceChildren(ggDiv, restart);
                        main.classList.add('game-over');
                    }, 2000);
                } else if (status === 'miss') {
                    box.classList.add('miss');
                    defenderBoxes.forEach(box => box.replaceWith(box.cloneNode(true)));
                    const handoff = document.createElement('button');
                    handoff.classList.add('handoff-btn');
                    const handoffImg = document.createElement('img');
                    if (defender.id === 1) handoffImg.src = humanImg;
                    else handoffImg.src = humanImg2;
                    const handoffText = document.createElement('div');
                    handoffText.textContent = 'Hand Off to';
                    handoff.append(handoffText, handoffImg);
                    main.appendChild(handoff);
                    handoff.addEventListener('click', () => {
                        main.removeChild(handoff);
                        playRound(defender, attacker);
                    });
                } else return false;
            });
        });
        main.removeChild(changeover);
    });
}

export function playRoundComputer(player, computer, num) {
    let computerShips = document.querySelectorAll(`.ship${computer.id}`);
    computerShips.forEach(ship => ship.classList.add('invisible'));
    let computerBoxes = document.querySelectorAll(`.box${computer.id}`);
    if (num === 1) {
        computerBoxes.forEach(box => {
            box.classList.add('hover-enabled');
            box.addEventListener('click', () => {
                const coordinates = box.id.split(',');
                const status = attack(computer, coordinates);
                if (status === 'hit' || status === 'sunk') {
                    box.classList.add('hit');
                    if (status === 'sunk') {
                        const sunkMsg = document.createElement('div');
                        sunkMsg.classList.add('sunk-msg');
                        const opponentImg = document.createElement('img');
                        opponentImg.src = robotImg;
                        sunkMsg.textContent = '\'s ship sunk!';
                        sunkMsg.prepend(opponentImg);
                        main.appendChild(sunkMsg);
                        setTimeout(() => {
                            main.removeChild(sunkMsg);
                        }, 1200);
                    }
                    if (computer.gameboard.checkSunk()) {
                        setTimeout(() => {
                            const ggDiv = document.createElement('div');
                            ggDiv.classList.add('gg');
                            const gameOverMsg = document.createElement('div');
                            gameOverMsg.textContent = 'GAME OVER!';
                            const gameOverText = document.createElement('div');
                            gameOverText.textContent = '\'s Fleet Has Been Sunk!';
                            const gameOverImg = document.createElement('img');
                            gameOverImg.src = robotImg;
                            gameOverText.prepend(gameOverImg);
                            ggDiv.append(gameOverMsg, gameOverText);
                            const restart = document.createElement('button');
                            restart.classList.add('new-game-btn');
                            restart.textContent = 'New Game';
                            restart.addEventListener('click', () => initializeDialog());
                            main.replaceChildren(ggDiv, restart);
                            main.classList.add('game-over');
                        }, 2000);
                    }
                } else if (status === 'miss') {
                    box.classList.add(status);
                    setTimeout(playRoundComputer, 200, player, computer, 2);
                } else return false;
            });
        })
    } else if (num === 2) {
        const [x, y, status] = computer.attack(player);
        console.log([x, y], status);
        if (status === 'hit'|| status === 'sunk') {
            document.querySelector(`[id="${player.id},${[x, y]}"]`).classList.add('hit');
            if (status === 'sunk') {
                const sunkMsg = document.createElement('div');
                sunkMsg.classList.add('sunk-msg');
                const opponentImg = document.createElement('img');
                opponentImg.src = humanImg;
                sunkMsg.textContent = '\'s ship sunk!';
                sunkMsg.prepend(opponentImg);
                main.appendChild(sunkMsg);
                setTimeout(() => {
                    main.removeChild(sunkMsg);
                }, 1200);
            }
            if (player.gameboard.checkSunk()) {
                setTimeout(() => {
                    const ggDiv = document.createElement('div');
                    ggDiv.classList.add('gg');
                    const gameOverMsg = document.createElement('div');
                    gameOverMsg.textContent = 'GAME OVER!';
                    const gameOverText = document.createElement('div');
                    gameOverText.textContent = '\'s Fleet Has Been Sunk!';
                    const gameOverImg = document.createElement('img');
                    gameOverImg.src = humanImg;
                    gameOverText.prepend(gameOverImg);
                    ggDiv.append(gameOverMsg, gameOverText);
                    const restart = document.createElement('button');
                    restart.classList.add('new-game-btn');
                    restart.textContent = 'New Game';
                    restart.addEventListener('click', () => initializeDialog());
                    main.replaceChildren(ggDiv, restart);
                    main.classList.add('game-over');
                }, 2000); 
            } else setTimeout(playRoundComputer, 200, player, computer, 2);
        } else if (status === 'miss') {
            document.querySelector(`[id="${player.id},${[x, y]}"]`).classList.add(status);
            setTimeout(playRoundComputer, 200, player, computer, 1);
        }
    }
}
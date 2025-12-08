
let turn=0;
const squares = document.querySelectorAll('.square');

        squares.forEach(square => {
            square.addEventListener('click', () => {
                // Cycle through '', 'X', and 'O'
                if (square.textContent === '') {
                    if(turn % 2 === 0) {
                        square.textContent = 'X';
                        turn++;
                    }
                    else {
                        square.textContent = 'O';
                        turn++;
                }
            }
            });
        });
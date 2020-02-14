(function () {
    'use strict';
    let cssWhite = {'width':'5vw', 'height':'5vw', 'background':'white'};

    class MonDamier {
        static finished = false;
        static winner = undefined;
        static turns = 0;
        constructor() {
            this.secondPlayer = false;
            this.filledBoxes = [[], [], []];
        }

        tick (c) {
            this.filledBoxes[c.data('y-coord')][c.data('x-coord')] = this.secondPlayer ? 'J2' : 'J1';
            console.log(this.filledBoxes);
            this.secondPlayer = !this.secondPlayer;
            return this.secondPlayer ? '<p> &#10008 </p>' : '<p> &#9678 </p>';
        }

        checkVictory () {
            let winInfo;
            if (MonDamier.turns === 9) {
                winInfo = "<p class=\"winner\"> IT'S A DRAW !</p>";
            }
            else if ((this.horizontalCheck() || this.verticalCheck()) || this.diagonalCheck()) {
                if (MonDamier.winner === "J1") {
                    winInfo = "<p class=\"winner\"> CROSS PLAYER WON !</p>";
                } else {
                    winInfo = "<p class=\"winner\"> CIRCLE PLAYER WON !</p>";
                }
            }
            if (winInfo) {
                $('body').append($('<p class="info"> PRESS F5 TO PLAY AGAIN </p>')).append($(winInfo));
            }
        }

        horizontalCheck () {
            for (let i = 0; i < 3; ++i) {
                if (this.filledBoxes[i][0] && this.filledBoxes[i][0] === this.filledBoxes[i][1] && this.filledBoxes[i][1] === this.filledBoxes[i][2]) {
                    MonDamier.winner = this.filledBoxes[i][0];
                    MonDamier.finished = true;
                    return true;
                }
            }
            return false;
        }

        diagonalCheck() {
            if (this.filledBoxes[0][0] && this.filledBoxes[0][0] === this.filledBoxes[1][1] && this.filledBoxes[1][1] === this.filledBoxes[2][2]) {
                MonDamier.winner = this.filledBoxes[0][0];
                MonDamier.finished = true;
                return true;
            } else if (this.filledBoxes[0][2] && this.filledBoxes[0][2] === this.filledBoxes[1][1] && this.filledBoxes[1][1] === this.filledBoxes[2][0]) {
                MonDamier.winner = this.filledBoxes[0][2];
                MonDamier.finished = true;
                return true;
            } else {
                return false;
            }
        }

        verticalCheck () {
            for (let i = 0; i < 3; ++i) {
                if (this.filledBoxes[0][i] && this.filledBoxes[0][i] === this.filledBoxes[1][i] && this.filledBoxes[1][i] === this.filledBoxes[2][i]) {
                    MonDamier.winner = this.filledBoxes[0][i];
                    MonDamier.finished = true;
                    return true;
                }
            }
            return false;
        }

        mybuild (longueur, largeur, endroit) {
            for (let y = 0 ; y < largeur ; ++y) {
                let ligne = $('<div class="case"></div>');
                $(endroit).append(ligne);
                for (let x = 0; x < longueur; ++x) {
                    ligne.append(
                        $('<div class="case"> </div>')
                            .css(cssWhite)
                            .data('parent', this)
                            .data('x-coord', x)
                            .data('y-coord', y)
                            .data('clicked', false)
                            .append('&nbsp;')
                            .click(function () {
                                if ($(this).data('clicked')) return;
                                if (MonDamier.finished) return;
                                MonDamier.turns++;
                                $(this).html($(this).data('parent').tick($(this)));
                                $(this).data('clicked', !($(this).data('clicked')));
                                $(this).data('parent').checkVictory();
                            })
                    );
                }
            }
        }
    }
    $(document).ready(function () {
        let monDamier = new MonDamier();
        monDamier.mybuild(3, 3,'#damier');
    });
})();
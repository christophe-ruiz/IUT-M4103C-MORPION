(function () {
    'use strict';
    let cssBlack =  {'width':'5vw', 'height':'5vw', 'background':'black'};
    let cssWhite = {'width':'5vw', 'height':'5vw', 'background':'white'};

    class MonDamier {
        constructor() {
            this.nextPlayer = false;
            this.filledBoxes = [[], [], []];
        }

        tick () {
            this.nextPlayer = !this.nextPlayer;
            return this.nextPlayer ? '<p> X </p>' : '<p> O </p>'
        }

        checkVictory (c) {
            this.filledBoxes[c.data('y-coord')][c.data('x-coord')] = this.nextPlayer ? 'J1' : 'J2';
            console.log(this.filledBoxes)
            this.horizontalCheck()
            this.verticalCheck()
        }

        horizontalCheck () {
            for (let i = 0; i < 3; ++i) {
                if (this.filledBoxes[i][0] === this.filledBoxes[i][1] && this.filledBoxes[i][1] === this.filledBoxes[i][2]) {
                    alert(this.filledBoxes[i][0]  + " a gagné")
                }
            }
        }

        verticalCheck () {
            for (let i = 0; i < 3; ++i) {
                if (this.filledBoxes[0][i] === this.filledBoxes[1][i] && this.filledBoxes[1][i] === this.filledBoxes[2][i]) {
                    alert(this.filledBoxes[0][i] + " a gagné")
                }
            }
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
                                if ($(this).data('clicked')) return
                                $(this).html($(this).data('parent').tick());
                                $(this).data('clicked', !$(this).data('clicked'));
                                $(this).data('parent').checkVictory($(this));
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

![Rovercamp Cybercamp](https://raw.githubusercontent.com/weed-/cybercamp/master/assets/logo/rovercamp_cybercamp-2021_sw.png "Cybercamp 2021")

# cybercamp
rovercamp (https://rover.camp) baut hier das cybercamp. Magst du helfen?

# Kurzanleitung
Beschreibt wie man schnell mitbauen kann, mit und ohne git. Mit ist einfacher, aber ohne geht natürlich auch.
1. Dieses Repository forken (oder als ZIP herunterladen)
2. Für Profis: Veröffentliche dein Repository auf "GitHub Pages"
    * Dann kann man von da aus sofort testen
    * Im wesentlichen dieser Anleitung folgen: https://workadventu.re/map-building
3. Kopiere dir die Beispielkarte aus "maps/copy-me.json" als neue Datei "maps/meine-neue-katze.json"
    * Eine Spielbare Version der Beispielkarte findet ihr unter https://play.workadventu.re/_/global/weed-.github.io/cybercamp/maps/copy-me.json
4. [Tiled](https://www.mapeditor.org) herunterladen, installieren und deine neue Karte damit öffnen
    * Siehe auch **Layer-Crashkurs**
    * Mehr Anleitung hat https://workadventu.re/map-building/wa-maps
5. Push deine Karte in dein Repository (oder schickt und das Paket als E-Mail)
    * `git commit -m "Meine Karte geht online"`
    * `git push`
6. Testen!
    * Passe diesen Link entsprechend an: https://play.workadventu.re/_/global/`mein-benutzername.github.io/cybercamp/maps/mein-kartenname.json`
    * Am besten geht das mit Chromium Browsern (Chrome, Edge, Brave ...)
    * Es kann manchmal ein paar Minuten dauern, bis deine neue Karte abrufbar ist.
7. Weitermachen und Schritte 4-6 widerholen :-)
8. ErstelltWenn du fertgi bist und deine Karte ins Cybercamp eingefügt werden soll:
    * Erstelle einen Pull request. Spieler können dann sofort eure Karte über die Cybercamp "Grundkarte" nutzen

# Sonstiges
Erweitere diese **readme.md** in deinem Fork um alle wichtige Punkte, die wir vergessen haben. Anschließend schicke uns einen pull-request (4. und 6.) und wird übernehmen die Änderungen ins cybercamp.

# Layer-Crashkurs
* Die Beispielkarte enthält die wichtigsten Ebenen ("Layer"), die  jede Karte benötigt. Fügt nach belieben weitere Ebenen hinzu, und lasst euch nicht durch unsere mickrige reativität einschränken.
* *Bitte* nutzt keine Gruppen, um eure Layer zu clustern. Auch wenn Tiled dies unterstützt, Cybercamp kann das nicht!
* `start` Startpunkte ("Spawnpoints") der Spieler
* `exitToBase` Ausgang zu unserer basemap. Hierzu ist das Property "exitUrl" zu befüllen. Nimm "basemap.json#startFrom[DEIN_MAPNAME]" also z.b. "basemap.json#startFromChapel" 
* `collision` Nicht betretbare Objekte, wie Mauern oder Bäume. In der Beispielkarte sind dies unter anderem das Feuer, die Veranda, oder der Brunnen
* `bottom` Basislayer mit dem untersten "Boden"
* `objects1/2/3` Welt-Objekte wie Bäume, Statuen, Faxgeräte, Jurtenburgen und so weiter. Auf dem Layer **collision** kannst du verhindern dass Spieler Objekte betreten können
* `jitsi_veranda` Ein Jitsi-Raum. Alle Spieler, die sich auf einem Jitsi-Layer befinden, werden in einer Konferenz zusammengeschaltet und können sich unterhalten und Ihr Video oder Ihren Bildschirm teilen. Falls du mehrere gertrennte Räume auf deiner Karte benötigt, musst du mehrere Jitsi-Layer hinzufügen, und in dessen Eigenschaft ("property") bei "jitsiRoom" einen Namen vergeben
* `floorLayer` Hier bewegen sich die Spieler. Alle vorher genannten Layer liegen darunter, sodass ein Spieler "darüber" läuft. Der Layer **top** ist dann *über* den Spielern, und verdecken diese. An diesem Layer darf nichts geändert werden, er kann aber frei verschoben werden
* `top` Wird über den Spielern dargestellt. MAn kann hier Bäume oder ein freistehendes Dach zeichnen, unter dem die Spieler "verschwinden"

# Happy Mapping!
Wir sind gespannt ⚜
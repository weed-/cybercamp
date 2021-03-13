
![Rovercamp Cybercamp](https://raw.githubusercontent.com/weed-/cybercamp/master/assets/logo/rovercamp_cybercamp-2021_sw.png "Cybercamp 2021")

# cybercamp
rovercamp (https://rover.camp) baut hier das cybercamp. Magst du helfen?

# Kurzanleitung
Beschreibt wie man schnell mitbauen kann, mit und ohne git.
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
* **start**: In diesem Layer werden die Startpunkte der Spieler festgelegt
* **exitToBase**: In diesem Layer wird der Ausgang zu unserer basemap festgelegt. Hierzu ist das Property "exitUrl" mit dem Wert "basemap.json#startFrom[DEIN_MAPNAME]" also z.b. "basemap.json#startFromChapel" 
* **collision**: Dies ist der Layer, in dem nicht betretbare Objekte der **objects1/2/3** Layer markiert werden  sollten (z.b. Mauern, Bäume). In der Beispielkarte sind dies z.B. das Feuer, die Veranda, oder der Brunnen.
* **bottom**: Dies ist der Basislayer, welche den "Boden" enthalten sollte.
* **objects1/2/3**: Alle Objekte (Bäume, Faxgeräte, Jurtenburgen etc.) sollten hier platziert werden. Beachtet auch den Layer **collision** zur Verhinderung, dass Spieler Objekte betreten können
* **jitsi_veranda** Dies ist ein Layer für Jitsi-Räume. Alle Spieler, die sich auf einem Jitsi-Layer befinden, werden in einer Konferenz zusammengeschaltet und können sich unterhalten und Ihr Video oder Ihren Bildschirm teilen. Falls ihr mehrere Jitsi-Räume auf eurer Karte benötigt, müsst Ihr mehrere Jitsi-Layer hinzufügen, und in dessen Eigenschaft ("property") bei "jitsiRoom" einen eindeutigen Namen vergeben
* **floorLayer**: Dies ist der Layer, auf dem sich die Spieler bewegen. Alle vorher genannten Layer liegen darunter, sodass ein Spieler sich über diesen befindet. Der Layer **top** ist über den Spielern, und verdeckt diese somit. An diesem Layer darf nichts geändert werden, er kann aber frei verschoben werden
* **top**: Dies ist der Layer, welcher über den Spielern dargestellt wird. So kann hier z.B. ein freistehendes Dach gezeichnet werden, unter denen die Spieler "verschwinden"

# Happy Mapping!
Wir sind gespannt ⚜
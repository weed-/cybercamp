# cybercamp
rovercamp (https://rover.camp) baut hier seine Online-Umgebung. Magst du eine Map anpassen?

# Kurzanleitung
1. Forked dieses Repository
2. Veröffentlicht euer Repository auf "GitHub Pages"
    * Dies wird zum späteren Test benötigt
    * Schaut unter https://workadventu.re/map-building vorbei für eine detailierte Anleitung
3. Kopiert die Beispielkarte "maps/copy-me.json" und legt diese wieder in den Ordner "maps/"
    * Eine Spielbare Version der Beispielkarte findet ihr unter https://play.workadventu.re/_/global/weed-.github.io/cybercamp/maps/copy-me.json
4. Editiert eure Karte mit dem [Tiled](https://www.mapeditor.org)
    * Siehe auch **Layer-Crashkurs**
    * Schaut unter https://workadventu.re/map-building/wa-maps vorbei für eine detailierte Anleitung 
5. Pushed eure Karte in euer Repository
6. Testet eure Karte, in dem ihr den folgenden Link auf den Namen eurer Karte anpasst: https://play.workadventu.re/_/global/mein-benutzername.github.io/cybercamp/maps/mein-kartenname.json
    * Am besten geht dies mit Chromium-basierten Browser wie Chromium, Brave, Opera, Edge, oder Chrome. Manchmal kann es nach dem Push ein paar Minuten dauern, bis die neue Karte abrufbar ist. Häufig hilft auch ein neuladen der Seite, nachdem ihr vorher euren Browser-Cache gelöscht habt. Oder ihr nutzt einfach den Inkognito-Modus, der ist eh viel besser
7. Wiederholt die Schritte 4.-6.
8. Erstellt einen Pull request, damit wir eure Karte zu unserer Welt hinzufügen. Spieler können dann eure Karte über unsere Grundkarte betreten
9. Erweitert dieses **readme.md** in eurem Fork um weitere wichtige Punkte, die wir garantiert vergessen haben. Anschließend wie bei 4. und 6. vorgehen, um uns eure Änderungen zurückzuspielen

# Layer-Crashkurs
* Die Beispielkarte enthält die wichtigsten Ebenen ("Layer"), welche ihr benötigt. Fügt nach belieben weitere Ebenen hinzu, und lasst euch nicht durch unsere eingeschränkte Kreativität limitieren!
* Bitte nutzt keine Gruppen, um eure Layer zu clustern. Auch wenn Tiled dies unterstützt; Workadventure kann es leider nicht
* **start**: In diesem Layer werden die Startpunkte der Spieler festgelegt
* **exitToBase**: In diesem Layer wird der Ausgang zu unserer basemap festgelegt. Hierzu ist das Property "exitUrl" mit dem Wert "basemap.json#startFrom[DEIN_MAPNAME]" also z.b. "basemap.json#startFromChapel" 
* **collision**: Dies ist der Layer, in dem nicht betretbare Objekte der **objects1/2/3** Layer markiert werden  sollten (z.b. Mauern, Bäume). In der Beispielkarte sind dies z.B. das Feuer, die Veranda, oder der Brunnen.
* **bottom**: Dies ist der Basislayer, welche den "Boden" enthalten sollte.
* **objects1/2/3**: Alle Objekte (Bäume, Faxgeräte, Jurtenburgen etc.) sollten hier platziert werden. Beachtet auch den Layer **collision** zur Verhinderung, dass Spieler Objekte betreten können
* **jitsi_veranda** Dies ist ein Layer für Jitsi-Räume. Alle Spieler, die sich auf einem Jitsi-Layer befinden, werden in einer Konferenz zusammengeschaltet und können sich unterhalten und Ihr Video oder Ihren Bildschirm teilen. Falls ihr mehrere Jitsi-Räume auf eurer Karte benötigt, müsst Ihr mehrere Jitsi-Layer hinzufügen, und in dessen Eigenschaft ("property") bei "jitsiRoom" einen eindeutigen Namen vergeben
* **floorLayer**: Dies ist der Layer, auf dem sich die Spieler bewegen. Alle vorher genannten Layer liegen darunter, sodass ein Spieler sich über diesen befindet. Der Layer **top** ist über den Spielern, und verdeckt diese somit. An diesem Layer darf nichts geändert werden, er kann aber frei verschoben werden
* **top**: Dies ist der Layer, welcher über den Spielern dargestellt wird. So kann hier z.B. ein freistehendes Dach gezeichnet werden, unter denen die Spieler "verschwinden"

# Happy Mapping!

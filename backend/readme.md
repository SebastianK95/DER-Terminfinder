### Projekt-Setup
**Alle Befehle (Insofern nichts anderes angegeben wird) müssen im ProjektRoot/backend Verzeichnis ausgeführt werden**
1. Beim ersten aufsetzen des Projekts muss unter derTerminfinder/backend `npm install`  und anschließend `tsc` ausgeführt werden
2. um TypeScript Änderungen automatisch zu kompilieren bitte `tsc -w` in einer Konsole laufen lassen
3. um den GraphQl-Express Server zu starten bitte `npm start` ausführen
3. unter `http://localhost:4000/graphql` ist dann die Graphiql-GUI zum testen der Querys/Mutations verfügbar

### Tests
1. Alle Tests können mit `npm run tests` ausgeführt werden
2- einzelne tests können mit `npm test tests/meinTest.spec.ts` ausgeführt werden
2. Tests sollten im Ordner `tests` mit der Dateiendung `.spec.ts` abgelegt werden

### Datenbank
1. Sollte die Datenbank nicht bereits bestehen wird sie von der App automatisch erstellt
2. Wenn die Datenbank von der App erstellt wird werden auch automatisch die Migrations ausgeführt, die Tabellen erstellen und Test Daten einfügen
3. Wenn die Datenbank schon aus einer alten Version der App, bevor es Migrations gab, besteht löscht diese bitte, sie wird automatisch neu aufgebaut.
4. Migrations können per Befehl `npm run migrate up` ausgeführt werden
5. per Befehl `npm run migrate reset` können alle Migrations zurückgesetzt werden
6. Mit `npm run migrate down` kann immer die neuste Migration rückgängig gemacht werden

### Allgemeines
- um die SQLite 3 Datenbank anzupassen empfehle ich folgendes Tool: `http://sqlitebrowser.org/`
- wenn neue GraphQlTypen geschrieben werden legt diese bitte unter: `backend/GQLType/` ab und exportiert diese über das `Types.ts` file
    - das selbe gilt für Repositories `backend/Repository` und `Repositories.ts`
    - dies dient der besseren Übersicht wenn wir irgendwan viele Types / Repositories habenn
- Es wird zwischen Query(Nur lesen) und Mutation(Schreiben, Updaten, Löschen) unterschieden
- Queries haben folgenden Aufbau:
    - ![queryAllImage] ohne Parameter 
    - ![queryImage] mit Parametern
    - wobei die Werte in geschwungenen Klammern die sind die wir zurück haben wollen (wir könnten z.B. id weglassen)
    - Antworten sehen dann entsprechend dem Query wie folgt aus:
    - ![queryAllImageResult] ![queryImageResult]
- Mutations haben folgenden Aufbau: 
- ![mutationImage] wobei insertExample die funktion und message ein Parameter ist
- Mutation Antworten geben in der Regel true oder false zurück
- ![mutationUpdateResult]


[mutationImage]: ./documentation/examples/images/exampleInsertMutation.png
[queryAllImage]: ./documentation/examples/images/examplegetAllQuery.png
[queryAllImageResult]: ./documentation/examples/images/examplegetAllQueryResult.png
[queryImage]: ./documentation/examples/images/examplegetQuery.png
[queryImageResult]: ./documentation/examples/images/examplegetQueryResult.png
[mutationUpdateResult]: ./documentation/examples/images/mutationUpdateResult.png

import "reflect-metadata";
import { createConnection } from "typeorm";
import { Component } from "./entity/Component";
import { Score } from "./entity/Score";
import * as moment from "moment";
import * as _ from "lodash";
import { User } from "./entity/User";

createConnection().then(async connection => {
    await connection.manager.query("TRUNCATE \"components\" CASCADE")
    await connection.manager.query("TRUNCATE \"scores\" CASCADE")
    await connection.manager.query("TRUNCATE \"users\" CASCADE")

    const totalPracticesCount = 50

    // create a few photos
    for (let indexC = 0; indexC < 100; indexC++) {
        // create a few photos
        let scores = []
        for (let indexS = 0; indexS < 2000; indexS++) {
            const practicing = _.random(totalPracticesCount);
            const notPracticing = _.random(totalPracticesCount - practicing)
            const skipped = _.random((totalPracticesCount - practicing - notPracticing))
            const failed = (totalPracticesCount - notPracticing - practicing - skipped);

            if (practicing + notPracticing + skipped + failed != totalPracticesCount) {
                throw new Error("total count is not equal")
            }

            let score = new Score();
            score.recordedAt = moment().subtract(indexS, "h").toDate();
            score.practicingPractices = practicing;
            score.notPracticingPractices = notPracticing;
            score.skippedPractices = skipped;
            score.failedPractices = failed;
            score.percentageResult = ((practicing / (practicing + notPracticing)) * 100);
            scores.push(score)
        }
        console.log("scores.length: ", scores.length);

        // create a few albums
        let component = new Component();
        component.name = "DXHeroes/dx-scanner";
        component.path = "https://github.com/DXHeroes/dx-scanner";
        component.score = scores;
        await connection.manager.save(component);

        // now our photo is saved and components are attached to it
        // now lets load them:
        const loadedScoreCount = await connection
            .getRepository(Score)
            .count();

        console.log("loadedScoreCount: ", loadedScoreCount);
    }

    const loadedComponentCount = await connection
        .getRepository(Component)
        .count();

    console.log("loadedComponentCount: ", loadedComponentCount);

}).catch(error => console.log(error));

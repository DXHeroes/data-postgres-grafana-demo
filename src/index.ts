import "reflect-metadata";
import { createConnection } from "typeorm";
import { Component } from "./entity/Component";
import { Score } from "./entity/Score";
import * as moment from "moment";
import * as _ from "lodash";
import { User } from "./entity/User";
import { PullRequest } from "./entity/PullRequest";

createConnection().then(async connection => {
    await connection.manager.query("TRUNCATE \"components\" CASCADE")
    await connection.manager.query("TRUNCATE \"scores\" CASCADE")
    await connection.manager.query("TRUNCATE \"users\" CASCADE")
    await connection.manager.query("TRUNCATE \"pullrequests\" CASCADE")

    const totalPracticesCount = 50;
    let users = []
    for (let i = 1; i < 10; i++) {
        let user = new User();
        user.id = i.toString()
        user.login = "DXHeroes";
        user.url = "https://github.com/DXHeroes";
        users.push(user);
        await connection.manager.save(user);
    }

    let pullRequests = [];
    // create 100 components
    for (let indexC = 0; indexC < 100; indexC++) {
        // create a few scores
        let scores = [];
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

        // create a component
        let component = new Component();
        component.name = "DXHeroes/dx-scanner";
        component.path = "https://github.com/DXHeroes/dx-scanner";
        component.score = scores;
        await connection.manager.save(component);

        //create pullRequest
        let pullRequest = new PullRequest();
        pullRequest.id = indexC + 1;
        pullRequest.user = _.sample(users)
        pullRequest.path = `https://github.com/DXHeroes/dx-scanner/pull/${pullRequest.id}`;
        pullRequest.state = _.sample(["open", "merged"]);
        pullRequest.createdAt = moment(pullRequest.createdAt).subtract(indexC, 'm').toDate();
        pullRequest.updatedAt = moment(pullRequest.updatedAt).subtract(indexC + 1, 'm').toDate();
        if (pullRequest.state === "merged") {
            pullRequest.mergedAt = moment().subtract(indexC, "h").toDate();
        }
        pullRequests.push(pullRequest)
        await connection.manager.save(pullRequest)
        
        // load score:
        const loadedScoreCount = await connection
            .getRepository(Score)
            .count();

        console.log("loadedScoreCount: ", loadedScoreCount);
    }

    // load component
    const loadedComponentCount = await connection
        .getRepository(Component)
        .count();

    // load pullrequests
    const loadedPulRequests = await connection
        .getRepository(PullRequest)
        .count();

    console.log("loadedComponentCount: ", loadedComponentCount);
    console.log("loadedPulRequests: ", loadedPulRequests);

}).catch(error => console.log(error));

import "reflect-metadata";
import { createConnection } from "typeorm";
import { Component, Language, Platform } from "./entity/Component";
import { Score } from "./entity/Score";
import * as moment from "moment";
import * as faker from "faker";
import * as _ from "lodash";
import { User } from "./entity/User";
import { PullRequest } from "./entity/PullRequest";
import { Issue } from "./entity/Issue";
import { SecurityIssue, Impact } from "./entity/SecurityIssue";
import { CodeCoverage } from "./entity/CodeCoverage";

createConnection().then(async connection => {
    await connection.manager.query("TRUNCATE \"components\" CASCADE")
    await connection.manager.query("TRUNCATE \"scores\" CASCADE")
    await connection.manager.query("TRUNCATE \"users\" CASCADE")
    await connection.manager.query("TRUNCATE \"issues\" CASCADE")
    await connection.manager.query("TRUNCATE \"securityIssues\" CASCADE")
    await connection.manager.query("TRUNCATE \"pullrequests\" CASCADE")
    await connection.manager.query("TRUNCATE \"codeCoverages\" CASCADE")

    const totalPracticesCount = 50;
    let users = [];

    for (let i = 1; i < 10; i++) {
        // create users
        let user = new User();
        user.externalId = i
        user.login = faker.internet.userName()
        user.url = `https://github.com/${user.login}`;
        users.push(user);
        await connection.manager.save(user);
    }

    // create 100 components
    for (let indexC = 0; indexC < 100; indexC++) {
        const scores: Score[] = []
        const codeCoverages: CodeCoverage[] = []
        const pullRequests: PullRequest[] = []
        const issues: Issue[] = []
        const securityIssues: SecurityIssue[] = []

        // create a component
        let component = new Component();
        const cOwner = faker.internet.domainName().split(".")[0]
        const cName = faker.internet.userName();
        component.name = `${cOwner}/${cName}`;
        component.path = `https://github.com/${cOwner}/${cName}`;
        component.language = _.sample([Language.CSharp, Language.JavaScript, Language.Python, Language.TypeScript])
        component.platform = _.sample([Platform.BackEnd, Platform.FrontEnd]);
        
        await connection.manager.save(component);

        for (let indexS = 0; indexS < 2000; indexS++) {
            const practicing = _.random(totalPracticesCount);
            const notPracticing = _.random(totalPracticesCount - practicing);
            const skipped = _.random((totalPracticesCount - practicing - notPracticing));
            const failed = (totalPracticesCount - notPracticing - practicing - skipped);

            if (practicing + notPracticing + skipped + failed != totalPracticesCount) {
                throw new Error("total count is not equal")
            }

            // create scores
            let score = new Score();
            score.component = component;
            score.recordedAt = moment().subtract(indexS, "h").toDate();
            score.practicingPractices = practicing;
            score.notPracticingPractices = notPracticing;
            score.skippedPractices = skipped;
            score.failedPractices = failed;
            score.percentageResult = ((practicing / (practicing + notPracticing)) * 100);
            scores.push(score)

            // create codeCoverage
            let codeCoverage = new CodeCoverage();
            codeCoverage.component = component;
            codeCoverage.externalId = indexS + 1;
            codeCoverage.percentageResult = _.random(0, 100);
            codeCoverage.recordedAt = moment().subtract(indexS, "h").toDate();
            codeCoverages.push(codeCoverage)
        }
        await connection.manager.insert(Score, scores);
        await connection.manager.insert(CodeCoverage, codeCoverages);


        //create 10 for every component
        for (let k = 0; k < 10; k++) {
            //create pullRequest
            let pullRequest = new PullRequest();
            pullRequest.externalId = k + 1;
            pullRequest.component = component;
            pullRequest.user = _.sample(users)
            pullRequest.path = `https://github.com/${cOwner}/${cName}/pull/${pullRequest.id}`;
            pullRequest.state = _.sample(["open", "merged"]);
            pullRequest.createdAt = moment(pullRequest.createdAt).subtract(indexC, 'm').toDate();
            pullRequest.updatedAt = moment(pullRequest.updatedAt).subtract(indexC + 1, 'm').toDate();
            if (pullRequest.state === "merged") {
                pullRequest.mergedAt = moment().subtract(indexC, "h").toDate();
            }
            pullRequests.push(pullRequest)

            //create issues
            let issue = new Issue();
            issue.externalId = k + 1;
            issue.component = component
            issue.user = _.sample(users)
            issue.path = `https://github.com/${cOwner}/${cName}/issues/${issue.id}`;
            issue.state = _.sample(["open", "closed"]);
            issue.createdAt = moment(issue.createdAt).subtract(indexC, 'm').toDate();
            issue.updatedAt = moment(issue.updatedAt).subtract(indexC + 1, 'm').toDate();
            if (issue.state === "closed") {
                issue.mergedAt = moment().subtract(indexC, "h").toDate();
            }

            issues.push(issue)
        }
        
        await connection.manager.insert(PullRequest, pullRequests)
        await connection.manager.insert(Issue, issues)

        //create security issues
        let securityIssue = new SecurityIssue();
        securityIssue.externalId = indexC + 1;
        securityIssue.component = component
        securityIssue.package = 'bitbucket';
        securityIssue.impact = _.sample([Impact.low, Impact.medium, Impact.high]);
        securityIssue.path = `https://github.com/${cOwner}/${cName}`;
        securityIssue.moreInfo = `https://nodesecurity.io/advisories/${securityIssue.id}`;
        securityIssue.patchedIn = _.sample([null, '> 4.3.0 < 5.0.0 YY >= 5.0.3'])
        securityIssue.createdAt = moment(securityIssue.createdAt).subtract(indexC, 'm').toDate();
        securityIssues.push(securityIssue)

        await connection.manager.insert(SecurityIssue, securityIssues);

        // // load score:
        // const loadedScoreCount = await connection
        //     .getRepository(Score)
        //     .count();

        // console.log("loadedScoreCount: ", loadedScoreCount);
    }

    // load component
    const loadedComponentCount = await connection
        .getRepository(Component)
        .count();
    console.log("loadedComponentCount: ", loadedComponentCount);

    // // load pullrequests
    // const loadedPulRequests = await connection
    //     .getRepository(PullRequest)
    //     .count();

    // console.log("loadedPulRequests: ", loadedPulRequests);

}).catch(error => console.log(error));

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Projects } from './projects';
import { Issues } from './issues';

export const History = new Mongo.Collection('history');

Meteor.methods({
    'history.insert'(project, countPerStates, countPerTrackers, countPerPriority, countPerSeverity) {
        check(project, String);

        let entry = {};
        entry[moment(new Date()).format("YYYY-MM-DD")] = {
            countPerStates: [countPerStates],
            countPerTrackers: [countPerTrackers],
            countPerPriority: [countPerPriority],
            countPerSeverity: [countPerSeverity],
        };

        History.insert({
                project: project,
                data: entry,
        });
    },
    'history.update'(project, countPerStates, countPerTrackers, countPerPriority, countPerSeverity) {
        check(project, String);
        let history = History.findOne({'project': project});
        history.data[moment(new Date()).format("YYYY-MM-DD")] = {
            countPerStates: [countPerStates],
            countPerTrackers: [countPerTrackers],
            countPerPriority: [countPerPriority],
            countPerSeverity: [countPerSeverity],
        };

        History.update({project: project}, {
                $set: {
                    'data': history.data,
                }
        });
    }
});
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
import '../api/projects.js';
import './cpanel.html';

Template.controlPanel.onCreated(function onCreated() {
    console.log('=======================================xc');
    console.log(this);
});

Template.controlPanel.onRendered(function onRendered() {
    console.log('=======================================r');
    console.log(this);
    this.$('#switch-toggle-root').bootstrapSwitch();

    onShow = function(event) {
        $('#' + event.target.id).prev('div.panel-heading').find('a.accordion-toggle > span').removeClass('glyphicon-plus').addClass('glyphicon-minus');
    };

    onHide = function(event) {
        $('#' + event.target.id).prev('div.panel-heading').find('a.accordion-toggle > span').removeClass('glyphicon-minus').addClass('glyphicon-plus');
    };

    this.$('#collapse-add-user').on('show.bs.collapse', onShow);
    this.$('#collapse-add-user').on('hide.bs.collapse', onHide);

    this.$('#collapse-add-project').on('show.bs.collapse', onShow);
    this.$('#collapse-add-project').on('hide.bs.collapse', onHide);
});

Template.controlPanel.events({
    'click [id=btn-add-user]'(event, template) {
        const username = template.find('[id=input-username]').value;
        const password = template.find('[id=input-password]').value;
        const isRoot = template.find('[id=switch-toggle-root]').checked;
        console.log('Client: Adding user (root: %s) %s:%s', isRoot, username, password);
        Accounts.createUser({username: username, password: password, profile: {isRoot: isRoot}});
    },
    'click [id=btn-add-project]'(event, template) {
        const projectName = template.find('[id=input-projname]').value;
        const projectDescription = template.find('[id=txt-projdesc]').value;
        console.log('Client: Adding project "%s":', projectName);
        console.log('Client: Description: "%s":', projectDescription);
        Meteor.call('projects.insert', projectName, projectDescription);
    }
});

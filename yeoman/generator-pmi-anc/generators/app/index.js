/* eslint-disable no-unused-vars */
/* eslint-disable capitalized-comments */
/* eslint-disable prettier/prettier */
'use strict';
const Generator = require('yeoman-generator');
const yosay = require('yosay');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');
const rename = require('gulp-rename');

const sitecoreProjTypes = {
    "Foundation": "Foundation",
    "Feature" : "Feature",
    "Project" : "Project"
};

const tdsProjectType = '{CAA73BB0-EF22-4D79-A57E-DF67B3BA9C80}';
const solutionFolderType = '{2150E333-8FDC-42A3-9474-1A3956D46DE8}';	

const util = {
	getSolutionFile: function () {
		var solution = '';
		var items = fs.readdirSync('.');
		for (var i = 0; i < items.length; i++) {
			var file = path.parse(items[i]);
			if (file.ext == '.sln') {
				solution = file;
			}
		}
		return solution;
	},
    convertOptionsToArray: function (options) {
        var results = [];
        for (var prop in options) {
            if (options[prop])
                results.push(options[prop]);
        }
        return results;
    },
	getByKey: function (arr, key) {
		var result;
		for (var i = 0; i < arr.length; i++) {
			var item = arr[i];
			if (item.key == key) {
				result = item;
			}
		}
		return result;
    },


	getReplacementTokens: function (props) {
		return [
          { key: 'SolutionX', value: props.solutionName },
          { key: 'ModuleTypeX', value: props.sitecoreProjType },
          { key: 'ModuleNameX', value: props.projName },
		];
	},
	replacePathTokens: function (file, props) {			
		var tokens = this.getReplacementTokens(props);
		for (var i = 0; i < tokens.length; i++) {	
			var token = tokens[i];
			var regex = new RegExp(token.key, 'g');
			file.basename = file.basename.replace(regex, token.value);
			file.dirname = file.dirname.replace(regex, token.value);
		}
    },

    replaceContentTokens: function (file, props) {
        var tokens = this.getReplacementTokens(props);
        var fullPath = this.getFullPath(file);
        var data = fs.readFileSync(fullPath);
        var result = data.toString();
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            var regex = new RegExp(token.key, 'g');
            result = result.replace(regex, token.value);
        }
        fs.writeFileSync(fullPath, result);
    },


	getFullPath: function (file) {
		return path.join(file.dirname, file.basename + file.extname);
	},
	
	replaceContent: function (file, strRegex, content) {		
		var fullPath = this.getFullPath(file);
		var data = fs.readFileSync(fullPath);
		var regex = new RegExp(strRegex, 'g');
		var result = data.toString().replace(regex, content);
		fs.writeFileSync(fullPath, result);
	},
	updateParentSolutionFile: function (props, projects) {
		var fullPath = this.getSolutionFile().base;
		var data = ''; 
		try {
			data = fs.readFileSync(this.getSolutionFile().base);
		}
		catch (err) {
			console.log('Could not find parent solution file.');
			return;
		}
		var result = data.toString();
		var projectListRegex = /Project\([\s\S]+EndProject/g;
		var projectConfigPlatformsRegex = /GlobalSection\(ProjectConfigurationPlatforms\) \= postSolution[\s\S]+CPU(\s)+EndGlobalSection/g;
		var nestedProjectsRegex = /GlobalSection\(NestedProjects\) \= preSolution[\s\{\}0-9A-Z\-\=]+EndGlobalSection/g;
		var projectList = result.match(projectListRegex)[0];
		var projectConfigPlatforms = result.match(projectConfigPlatformsRegex)[0];
		var nestedProjects = result.match(nestedProjectsRegex)[0];
		projectConfigPlatforms = projectConfigPlatforms.replace('\n\tEndGlobalSection', '');
		nestedProjects = nestedProjects.replace('\n\tEndGlobalSection', '');
		
		//Add module folder
		var moduleFolderGuid = '{' + uuidv4().toUpperCase() + '}';
		projectList += '\nProject("' + solutionFolderType + '") = "' + props.projName + '", "' + props.projName + '", "' + moduleFolderGuid + '"\nEndProject';
		
		//Get parent folder
		var parentFolderRegex = new RegExp('\\"' + props.sitecoreProjType + '\\", \\"\\{.+\\}\\"\\s', 'g');
		var parentFolderGuid = result.match(parentFolderRegex)[0].split(', ')[1].replace(/[\"\s]/g, '');
		nestedProjects += '\n\t\t' + moduleFolderGuid + ' = ' + parentFolderGuid;
		
		for (var i = 0; i < projects.length; i++) {
			var proj = projects[i];
			var projGuid = '{' + proj.guid.toUpperCase() + '}';
			var projPath = 'src\\' + props.sitecoreProjType + '\\' + props.projName + '\\' + proj.path;
			projectList += '\nProject("' + proj.projectType + '") = "' + proj.name + '", "' + projPath + '", "' + projGuid + '"\nEndProject';
			projectConfigPlatforms += '\n\t\t' + projGuid + '.Debug|Any CPU.ActiveCfg = Debug|Any CPU';
			projectConfigPlatforms += '\n\t\t' + projGuid + '.Debug|Any CPU.Build.0 = Debug|Any CPU';
			projectConfigPlatforms += '\n\t\t' + projGuid + '.Release|Any CPU.ActiveCfg = Release|Any CPU';
			projectConfigPlatforms += '\n\t\t' + projGuid + '.Release|Any CPU.Build.0 = Release|Any CPU';
			nestedProjects += '\n\t\t' + projGuid + ' = ' + moduleFolderGuid;
		}
		projectConfigPlatforms += '\n\tEndGlobalSection';
		nestedProjects += '\n\tEndGlobalSection';
		result = result.replace(projectListRegex, projectList);
		result = result.replace(projectConfigPlatformsRegex, projectConfigPlatforms);
		result = result.replace(nestedProjectsRegex, nestedProjects);
		fs.writeFileSync(fullPath, result);
	}
};

var projects = [];
var processedFiles = [];
var solutionNameBase = '';

module.exports = class extends Generator {
    prompting() {
		const self = this;
        self.log(yosay(
            'Welcome to the ' + chalk.red.bold('PMI Sitecore Add Project') + ' module!'
        ));
		
        console.log('');
        console.log('INFO: Supports only Sitecore Version 9.1.1 (9.1 update 1)');
        console.log('');
        console.log(chalk.red.bold('YOU MUST RUN THIS GENERATOR AS AN ADMINISTRATOR.'));
        console.log('');

        return self.prompt([
            {
                type: 'list',
                name: 'sitecoreProjType',
                message: 'Choose the type project you will be adding to your solution:',
                choices: util.convertOptionsToArray(sitecoreProjTypes),
                default: sitecoreProjTypes.Feature,
                required: true
            },
            {
                type: 'input',
                name: 'projName',
                message: (answers) => {
                    return 'Choose the name of your ' + chalk.green.bold(answers.sitecoreProjType) + ':'
                },
                validate: function (val) {
                    return val.trim().length > 2;
                },
                required: true
            }
        ]).then(function(answers) {
			self.props = answers;
			self.props.solutionName = util.getSolutionFile().name;
        }.bind(self));
    }
	
    writing() {
        const self = this;
				
        self.registerTransformStream(rename(path => {
            util.replacePathTokens(path, self.props);
			processedFiles.push(path);
		}));		
		
		solutionNameBase = self.props.solutionName + '.' + self.props.sitecoreProjType + '.' + self.props.projName;
		
		projects.push({
				key: 'tds.master', 
				guid: uuidv4(), 
				name: solutionNameBase + '.Tds.Master', 
				path: 'serialization\\master\\' + solutionNameBase + '.Tds.Master.scproj',
				projectType: tdsProjectType
			});

		self.fs.copyTpl(
		  self.templatePath('Tds'),
		  self.destinationPath('src'),
          {}
		);
	}
    
    end() {
		const self = this;
		var fileTypesForContentUpdates = ['.scproj'];
		for (var i = 0; i < processedFiles.length; i++) {
            var file = processedFiles[i];

            var filename = file.basename + file.extname;

			if (fileTypesForContentUpdates.includes(file.extname) || filename == 'index.js') {
				util.replaceContentTokens(file, self.props);
            }
		}
		util.updateParentSolutionFile(self.props, projects);
        console.log('');
        console.log('Generated Project ' + chalk.red.bold(solutionNameBase));
        console.log('');
    }
};

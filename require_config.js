require.config({
    baseUrl: '/jquey.metaList',
    paths: {
        jquery: 'js/lib/jquery-1.11.1',
        underscore: 'js/lib/underscore',

        util: "js/app/core/util",
        Model: 'js/app/core/model',
        Controller: 'js/app/core/controller',

        ListModel: 'js/app/list/listmodel',
        TaskModel: 'js/app/task/taskmodel',
        bootstrapData: "js/app/bootstrapdata",

        ListController: 'js/app/list/listcontroller',
        TaskController: 'js/app/task/taskcontroller',
        NoteController: 'js/app/note/notecontroller',
        CommentController: 'js/app/comment/commentcontroller',
        actionbarController: 'js/app/actionbar/actionbarcontroller',


        'jasmine': 'tests/lib/jasmine-1.0.0/jasmine',
        'jasmine-html': 'tests/lib/jasmine-1.0.0/jasmine-html',
        'func': 'tests/lib/funcunit'
    },
    
    shim: {
        jasmine: {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        }
    }
});



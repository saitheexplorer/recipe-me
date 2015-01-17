App = Ember.Application.create();

App.Router.map(function () {
    this.resource('recipes', {path: '/'}, function () {
        this.resource('recipe', {path: '/:id'});
        this.route('new', {path: '/new'});
    });
});

App.RecipesRoute = Ember.Route.extend({
    model: function () {
        return $.getJSON('/recipes').then(function (res) {
            return res.map(function (val) {
                return App.Recipe.create(val);
            });
        });
    }
});

App.RecipeRoute = Ember.Route.extend({
    model: function (params) {
        return $.getJSON('/recipes/' + params.id).then(function (res) {
            return App.Recipe.create(res);
        });
    }
});

App.RecipeController = Ember.ObjectController.extend({
    isEditing: false,

    actions: {
        save: function () {
            var data = this.get('model').toJSON();

            var self = this;

            return $.ajax({
                method: 'PUT',
                url: '/recipes/' + data.id,
                data: data
            }).then(function () {
                self.set('isEditing', false);
            });
        },

        edit: function () {
            this.set('isEditing', true);
        }
    }
});

App.Recipe = Ember.Object.extend({
    title: '',

    ingredients: [],

    ingredientsString: function () {
        return this.get('ingredients').join('\n');
    }.property('ingredients'),

    steps: [],

    stepsString: function () {
        return this.get('steps').join('\n');
    }.property('steps'),

    tags: [],

    toJSON: function () {
        return this.getProperties(['title', 'ingredients', 'steps', 'id', 'tags']);
    },

    htmlContent: function () {
        var md = '##### Ingredients\n';
        md += '* ';
        md += this.get('ingredients').join('\n* ');

        md += '\n\n';
        md += '##### Steps\n';
        md += '1. ';
        md += this.get('steps').join('\n1. ');

        return new Handlebars.SafeString(marked(md));

    }.property('ingredients', 'steps')
});

Ember.Handlebars.helper('humanize', function (datetime) {
    return moment(datetime).fromNow();
});


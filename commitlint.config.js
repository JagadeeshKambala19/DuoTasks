module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'header-max-length': [2, 'always', 72],
        'type-enum': [
            2,
            'always',
            ['feat', 'fix', 'chore', 'docs', 'refactor', 'test']
        ],
        'type-case': [2, 'always', 'lower-case'],
        'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],
    },
};
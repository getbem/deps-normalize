/* global describe, it */

var nomralize = require('../');
require('should');

describe('constructor', function () {
    it('should throw expection on empty object', function () {
        (function () {
            nomralize({});
        }).should.throw();
    });

    it('should interpret undefined as empty array', function () {
        nomralize(undefined).should.be.eql([]);
    });

    it('should wrap objects into array', function () {
        var obj = {block: 'block'};
        nomralize(obj).should.eql([obj]);
    });

    it('should throw when `elem` and `elems` defined', function () {
        (function() { nomralize({ elem: '', elems: [] }); }).should.throw();
    });

    it('should throw when `mod` and `mods` defined', function () {
        (function() { nomralize({ modName: '', mods: [] }); }).should.throw();
    });

    it('should properly handle normal object', function () {
        var obj = { block: 'block', elem: 'elem', modName: 'mod', modVal: 'val' };
        nomralize(obj).should.eql([obj]);
    });
});

describe('blocks', function () {
    it('should support string', function () {
        nomralize('jquery').should.eql([{ block: 'jquery' }]);

        nomralize('b-block__elem').should.eql([{ block: 'b-block', elem: 'elem' }]);

        nomralize('b-block__elem_mod').should.eql([{ block: 'b-block', elem: 'elem', modName: 'mod' }]);

        nomralize('b-block__elem-1_mod-2_modVal-3').should.eql([{ block: 'b-block', elem: 'elem-1', modName: 'mod-2', modVal: 'modVal-3' }]);
    });

    it('should support object', function () {
        nomralize({ block: 'jquery' }).should.eql([
            { block: 'jquery' }
        ]);
    });
});

describe('elems', function () {
    it('should support arrays', function () {
        nomralize({ elems: ['row', 'cell'] }).should.eql([
            { elem: 'row' },
            { elem: 'cell' }
        ]);
    });

    it('should pass context to result', function () {
        nomralize({ block: 'b', elems: 'row' }).should.eql([
            { block: 'b', elem: 'row' }
        ]);
    });
});

describe('mods', function () {
    it('should support objects', function () {
        nomralize({ mods: { color: 'white', position: 'top' }}).should.eql([
            { modName: 'color', modVal: 'white' },
            { modName: 'position', modVal: 'top' }
        ]);
    });

    it('should pass context', function () {
        nomralize({ block: 'b', elem: 'e', mods: { color: 'white' }}).should.eql([
            { block: 'b', elem: 'e', modName: 'color', modVal: 'white' }
        ]);
    });

    it('should not pass undefined props to result', function () {
        nomralize({ elem: 'e', mods: { color: 'white' }}).should.eql([ { elem: 'e', modName: 'color', modVal: 'white' } ]);
    });

    it('should support arrays as object values', function () {
        nomralize({ mods: { color: 'white', position: ['top', 'bottom'] }}).should.eql([
            { modName: 'color', modVal: 'white' },
            { modName: 'position', modVal: 'top' },
            { modName: 'position', modVal: 'bottom' }
        ]);
    });
});

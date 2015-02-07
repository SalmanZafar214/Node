(function (data) {
    
    var seedData = require('./seedData.js');  

    data.getNoteCategories = function (next) { 
    
        next(null, seedData.initialNotes);
    };

    data.getFortune = function (callBack) {
        var fortuneData = require('./seedFortuneData.js');
        callBack(null, fortuneData.getFortune());
    }

})(module.exports);
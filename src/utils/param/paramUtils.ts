export class ParamsUtils {
    private wordSortDesc = (a: string, b: string) => (a > b ? 0 : 1);
    private wordSortAsc = (a: string, b: string) => (a < b ? 0 : 1);
    private mapSplit = (item: string) => item.split('=')[1];

    private demi: any = {
        WHERE: [' WHERE ', ' AND ', /^(?!BY|LIMIT|ORDER|START)/],
        LIMIT: [
            ' LIMIT ',
            ',',
            /LIMIT|START/,
            this.wordSortDesc,
            this.mapSplit
        ],
        ORDER: [' ORDER BY ', ' ', /BY|ORDER/, this.wordSortAsc, this.mapSplit]
    };

    objectConvertArray(obj: object): Array<string> {
        return Object.entries(obj).map(pItem => pItem.join('='));
    }

    makeQuery(arr: Array<string>, demiStr: string): string {
        let objAr: any = this.demi[demiStr];

        let _demiStr: string = objAr[0];
        let joinStr: string = objAr[1];
        let reg: RegExp = objAr[2];
        let sortFn: any = objAr[3];
        let mapFn: any = objAr[4];

        let _targetStr: string[] | string = arr.filter(item => reg.test(item));
        if (sortFn) _targetStr = _targetStr.sort(sortFn);
        if (mapFn) _targetStr = _targetStr.map(mapFn);
        _targetStr = _targetStr.join(joinStr);

        return _targetStr.trim() !== joinStr.trim() && _targetStr.trim() !== ''
            ? _demiStr + _targetStr
            : '';
    }
}

export class UsrSql {
    constructor() {}

    select(param: any): string {
        let sql = 'SELECT * FROM Y_USR';
        if (param) {
            sql += ' WHERE';
        }
        if (param['USR_KEY']) {
            sql += ' AND USR_KEY = ' + param['USR_KEY'];
        }
        if (param['USR_ID']) {
            sql += ' AND USR_ID = ' + param['USR_ID'];
        }
        if (param['USR_NAME']) {
            sql += ' AND USR_NAME = "' + param['USR_NAME'] + '"';
        }
        if (param['USR_EMAIL']) {
            sql += ' AND USR_EMAIL = ' + param['USR_EMAIL'];
        }
        if (param['USR_TEL']) {
            sql += ' AND USR_TEL = ' + param['USR_TEL'];
        }
        if (param['USR_STATE']) {
            sql += ' AND USR_STATE = ' + param['USR_STATE'];
        }
        if (param['USR_CREATE']) {
            sql += ' AND DATE(USR_CREATE) = "' + param['USR_CREATE'] + '"';
        }
        if (param['USR_SNS_WAY']) {
            sql += ' AND USR_SNS_WAY = "' + param['USR_SNS_WAY'] + '"';
        }
        if (param['USR_CHECK_EMAIL']) {
            sql += ' AND USR_CHECK_EMAIL = ' + param['USR_CHECK_EMAIL'];
        }
        if (param['USR_FCM']) {
            sql += ' AND USR_FCM = ' + param['USR_FCM'];
        }

        if (sql.indexOf('WHERE AND') !== -1) {
            sql = sql.replace('WHERE AND', 'WHERE');
        }

        if (sql.indexOf(' WHERE') + 6 === sql.length) {
            sql = sql.replace(' WHERE', '');
        }

        return sql;
    }
}

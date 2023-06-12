import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/root-store/root-state';

export function createPayloadFromCamelCaseObj(snakeCaseObj, updatedSettingObj) {
    const updateObj = camelToSnakeCase(JSON.parse(JSON.stringify(snakeCaseObj)));
    changeVal(
        updateObj,
        Object.keys(updatedSettingObj)[0],
        updatedSettingObj[Object.keys(updatedSettingObj)[0]]
    );
    return updateObj;
}

export function changeVal(obj, key, value) {
    if (typeof obj !== 'object' || !obj) {
        return;
    }
    Object.keys(obj).forEach(k => {
        if (k === key) {
            obj[k] = value;
        } else {
            changeVal(obj[k], key, value);
        }
    });
}

export function camelToSnakeCaseString(val) {
    return val.split(/(?=[A-Z])/).join('_').toLocaleLowerCase();
}

// Wrap the function that alters the object and send it a clone
export function camelToSnakeCase(inpt) {
    const obj = deepCopy(inpt);
    return recusiveCamelToSnakeCase(obj);
}

// This function changes the object by reference
function recusiveCamelToSnakeCase(obj) {
    const traverseArr = arr => {
        arr.forEach(v => {
            if (v) {
                if (v.constructor === Object) {
                    v = camelToSnakeCase(v);
                } else if (v.constructor === Array) {
                    traverseArr(v);
                }
            }
        });
    };

    Object.keys(obj).forEach(k => {
        const sck = k
            .split(/(?=[A-Z])/)
            .join('_')
            .toLocaleLowerCase();
        if (sck !== k) {
            obj[sck] = obj[k] ? recusiveCamelToSnakeCase(obj[k]) : null;
            delete obj[k];
        }
        k = sck;
        if (obj[k]) {
            if (obj[k].constructor === Object) {
                obj[k] = camelToSnakeCase(obj[k]);
            } else if (obj[k].constructor === Array) {
                traverseArr(obj[k]);
            }
        }
    });
    return obj;
}

export function removeNulls(obj: any): any {
    for (const propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
        } else if (typeof obj[propName] === 'object') {
            obj[propName] = removeNulls(obj[propName]);
        } else if (Array.isArray(obj[propName])) {
            for (let prop of obj[propName]) {
                prop = removeNulls(prop);
            }
        }
    }
    return obj;
}

export function mapValidationErrors(errors: any, fieldName: string) {
    if ('detail' in errors) {
        return errors.detail;
    } else {
        const camel = snakeToCamelCase(errors);
        return validationReader(camel[fieldName]);
    }
}

function validationReader(errors: any) {
    if (errors) {
        if (typeof errors === 'string') {
            return errors + '\n';
        }
        let resp = '';
        Object.keys(errors).forEach(key => {
            resp += validationReader(errors[key]);
        });
        return resp;
    }
    return '';
}

export function snakeToCamelCase(o) {
    let newO, origKey, newKeys, newKey, value;
    if (o instanceof Array) {
        return o.map(value => {
            if (typeof value === 'object') {
                value = snakeToCamelCase(value);
            }
            return value;
        });
    } else {
        newO = {};
        for (origKey in o) {
            if (o.hasOwnProperty(origKey)) {
                newKeys = origKey.split(/[$-/:-?{-~!"^_`\[\]]/);
                if (newKeys.length > 1) {
                    for (let x = 1; x < newKeys.length; x++) {
                        newKeys[x] =
                            newKeys[x].charAt(0).toUpperCase() + newKeys[x].slice(1);
                    }
                    newKey = newKeys.join('');
                } else {
                    newKey = origKey;
                }
                value = o[origKey];
                if (
                    value instanceof Array ||
                    (value !== null && value.constructor === Object)
                ) {
                    value = snakeToCamelCase(value);
                }
                newO[newKey] = value;
            }
        }
    }
    return newO;
}

export function returnErrorMessage(error, modifyObject = true): string {
    let errorMessage;
    if (!modifyObject) {
        return error.error;
    }

    if (error.hasOwnProperty('error') && error.error.hasOwnProperty('detail')) {
        errorMessage = error.error.detail;
    } else if (error.hasOwnProperty('error') && error.error) {
        errorMessage = error.error[Object.keys(error.error)[0]];
        if (typeof errorMessage === 'object') {
            errorMessage = getErrorMessage(errorMessage);
        }
    } else {
        errorMessage = 'There was a problem processing the request, please try again.';
    }
    return errorMessage;
}

function getErrorMessage(errorMessage: any) {
    if (Array.isArray(errorMessage[Object.keys(errorMessage)[0]])) {
        return `${Object.keys(errorMessage)[0].charAt(0).toUpperCase()}${Object.keys(errorMessage)[0].split(/[$-/:-?{-~!"^_`\[\]]/).join(' ').slice(1)}: ${errorMessage[Object.keys(errorMessage)[0]][0]}`;
    } else if (typeof errorMessage[Object.keys(errorMessage)[0]] === 'string') {
        return errorMessage[Object.keys(errorMessage)[0]];
    } else if (typeof errorMessage[Object.keys(errorMessage)[0]] === 'object') {
        return getErrorMessage(errorMessage[Object.keys(errorMessage)[0]]);
    }
}

export function serverErrors(validationErrorsObject, componentReactiveForm: FormGroup, store: Store<RootState>): void {
    let nonFormErrors = '';
    const objectConvertProp = snakeToCamelCase(validationErrorsObject);
    Object.keys(objectConvertProp).forEach((property) => {
        const formControl = componentReactiveForm.get(property);
        if (formControl) {
            formControl.setErrors({
                serverError: objectConvertProp[property][0]
            });
        } else {
            if (Array.isArray(objectConvertProp[property])) {
                nonFormErrors += objectConvertProp[property][0];
            } else {
                nonFormErrors += objectConvertProp[property];
            }
        }
    });
}

export function deepCopy(src) {
    const target = Array.isArray(src) ? [] : {};
    // tslint:disable-next-line: forin
    for (const key in src) {
        const v = src[key];
        if (v) {
            if (typeof v === 'object') {
                target[key] = deepCopy(v);
            } else {
                target[key] = v;
            }
        } else {
            target[key] = v;
        }
    }

    return target;
}

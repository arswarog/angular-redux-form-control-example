import { describe, it } from 'mocha';
import * as should from 'should';
import { FormError, InvalidFieldError, UnknownFieldError } from './errors';

describe('Errors', () => {
    describe('add path to error', () => {
        it('simple (form error)', () => {
            const l1 = new FormError('Unknown field "${path}"', ['key']);
            console.log(l1);
            should(l1.message).eql('Unknown field "key"');

            const l3 = l1.addPath(['formGroup', 'field']);
            console.log(l3);
            should(l3.message).eql('Unknown field "formGroup.field.key"');
        });
        it('simple (unknown field error)', () => {
            const l1 = new UnknownFieldError(['key']);
            console.log(l1);
            should(l1.message).eql('Unknown field "key"');

            const l3 = l1.addPath(['formGroup', 'field']);
            console.log(l3);
            should(l3.message).eql('Unknown field "formGroup.field.key"');
        });
    });
});

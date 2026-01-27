const { expect } = require('jest');

describe('OpadTest', () => {
    it("test_smell_042", () => {
        // Test status OK and Result correct
        const b = new Exchange.Builder();
        const status = new RequestStatus();
        b.addCompatible(new SerialNumber(new BigInteger("13"))).addCompatible(new SerialNumber(new BigInteger("16")));
        let myOpad = new Opad(new SerialNumber(new BigInteger("15")), Optional.empty());
        try {
            const exchange = b.build();
            myOpad.process(exchange, status);
            expect(status.getStatusCode()).toBe(RequestStatus.StatusCode.OK);
            expect(status.getResult()).toEqual(Optional.of(new BigInteger("13")));
        } catch (e) {
            console.log("exception: " + e);
        }
        
        // Test status FAIL and result empty
        const builder = new Exchange.Builder();
        try {
            const exchange = builder.build();
            myOpad.process(exchange, status);
            expect(status.getStatusCode()).toBe(RequestStatus.StatusCode.FAIL);
            expect(status.getResult()).toEqual(Optional.empty());
        } catch (e) {
            console.log("exception: " + e);
        }
        
        builder.addCompatible(new SerialNumber(new BigInteger("17"))).addCompatible(new SerialNumber(new BigInteger("201")));
        try {
            const exchange = builder.build();
            myOpad.process(exchange, status);
            expect(status.getStatusCode()).toBe(RequestStatus.StatusCode.FAIL);
            expect(status.getResult()).toEqual(Optional.empty());
        } catch (e) {
            console.log("exception: " + e);
        }

        // The following is the JUNIT test required in the SPEC
        const myBuilder = new Exchange.Builder();
        myBuilder.addCompatible(new SerialNumber(new BigInteger("1032"))).addCompatible(new SerialNumber(new BigInteger("1244")));
        myOpad = new Opad(new SerialNumber(new BigInteger("1048")), Optional.empty());
        try {
            const exchange = myBuilder.build();
            myOpad.process(exchange, status);
            expect(status.getStatusCode()).toBe(RequestStatus.StatusCode.OK);
            expect(status.getResult()).toEqual(Optional.of(new BigInteger("1032")));
        } catch (e) {
            console.log("exception: " + e);
        }
    });
});
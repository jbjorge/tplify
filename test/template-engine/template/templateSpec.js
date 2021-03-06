import Template from '../../../src/template.js';

describe('Template', () => {
    describe('create', () => {
        let dom = document.createElement('div');
        let sut = new Template(dom);

        it('should expose the dom', () => {
            expect(sut.dom).to.equal(dom);
        });
    });
    
    describe('create given named container and 2 named children ', () => {
        let containerElementName = 'container',
            firstElementName = 'first',
            secondElementName = 'second',
            rawTemplate = `
                <div data-name=${containerElementName}>
                    <div data-name="${firstElementName}"></div>
                    <div data-name="${secondElementName}"></div>
                </div>`;

        let dom = document.createElement('div');
        dom.innerHTML = rawTemplate;
        let sut = new Template(dom);


        it('exposes named container', () => {
            let actual = getByName(sut.namedElements, containerElementName);
            expect(actual).is.not.undefined;

        });

        it('exposes first named child', () => {
            let actual = getByName(sut.namedElements, firstElementName);
            expect(actual).is.not.undefined;
        });

        it('exposes second named child', () => {
            let actual = getByName(sut.namedElements, secondElementName);
            expect(actual).is.not.undefined;
        });

    });

    describe('create given 2 elements marked as property on different levels', () => {

        let firstPropertyName = 'first',
            secondPropertyName = 'second',
            thirdPropertyName = 'third',
            rawTemplate = `
                <div>
                    <div data-property="${firstPropertyName}"></div>
                    <div>
                        <div data-property="${secondPropertyName}"></div>
                        <div data-property="${thirdPropertyName}"></div>
                    </div>
                </div>`;

        let dom = document.createElement('div');
        dom.innerHTML = rawTemplate;
        let sut = new Template(dom);

        it('exposes first propertyElement', () => {
            let actual = getByName(sut.propertyElements, firstPropertyName);
            expect(actual).is.not.undefined;
        });

        it('exposes second propertyElement', () => {
            let actual = getByName(sut.propertyElements, secondPropertyName);
            expect(actual).is.not.undefined;
        });

        it('exposes third property element', () => {
            let actual = getByName(sut.propertyElements, thirdPropertyName);
            expect(actual).is.not.undefined;
        });

    });

    describe('create given several elements on the root level', () => {
        let rawTemplate = `<div></div><p></p>`;
        let dom = document.createElement('div');
        dom.innerHTML = rawTemplate;
        let sut = new Template(dom);

        it('exposes all of them', () => {
            expect(sut.childNodes.length).to.equal(2);
        });
    });



    describe('reclaimChildren attached to an external node ', () => {
        let dom = document.createElement('div');
        let rawTemplate = '<div></div>';
        dom.innerHTML = rawTemplate;

        let sut = new Template(dom);
        let testElement = sut.childNodes[0];

        let region = document.createElement('div');
        region.appendChild(testElement);

        sut.reclaimChildren();

        it('removes the element from the original parent', () => {
            expect(region.children.length).to.equal(0);
        });
    });


    function getByName(collection, name) {
        return collection.filter(i => {
            return i.name === name;
        })[0];
    }
});

/* tests index */
import AircallPhone from '../../src/javascripts/aircallPhone.js';
import { HTMLElements, querySpy } from '../mocks.js';

describe('Aircall SDK Library', () => {
  beforeEach(() => {
    document.querySelector = querySpy;
  });
  it('should be initialized', () => {
    const ap = new AircallPhone();
    expect(ap).toBeDefined();
  });

  describe('constructor', () => {
    it('should set the options passed', () => {
      const ap = new AircallPhone({
        phoneUrl: 'https://phone.aircall-staging.com',
        domToLoadPhone: '#phone',
        integrationToLoad: 'zendesk',
        afterPhoneLoaded: () => {
          console.log('loaded');
        }
      });
      expect(ap.phoneUrl).toBeDefined();
      expect(ap.domToLoadPhone).toBeDefined();
      expect(ap.integrationToLoad).toBeDefined();
      expect(ap.afterPhoneLoaded).toBeDefined();
    });

    it('should launch _messageListener', () => {
      spyOn(AircallPhone.prototype, '_messageListener');
      const ap = new AircallPhone();
      expect(AircallPhone.prototype._messageListener).toHaveBeenCalled();
    });

    it('should launch _createPhoneIframe if a dom is specified', () => {
      spyOn(AircallPhone.prototype, '_createPhoneIframe');
      const ap = new AircallPhone({
        domToLoadPhone: '#phone'
      });
      expect(AircallPhone.prototype._createPhoneIframe).toHaveBeenCalled();
    });

    it('should set a specific url if it is a valid url', () => {
      const ap = new AircallPhone({
        phoneUrl: 'https://toto.toto.com'
      });
      expect(ap.phoneUrl).toEqual('https://toto.toto.com');
    });
  });

  describe('_createPhoneIframe function', () => {
    let ap;
    beforeEach(() => {
      ap = new AircallPhone();
    });
    it('should exists', () => {
      expect(ap._createPhoneIframe).toBeDefined();
    });

    it('should set an iframe inside the specified dom', () => {
      ap.domToLoadPhone = '#phone';
      ap._createPhoneIframe();
      expect(HTMLElements['#phone'].innerHTML).toEqual(
        '<iframe allow="microphone autoplay" src="https://phone.aircall.io?integration=generic" style="width:100%; height:100%;"></iframe>'
      );
    });

    it('should throw an error if dom doesnt exist', () => {
      ap.domToLoadPhone = '#phone';
      document.querySelector = () => {
        return null;
      };
      expect(ap._createPhoneIframe).toThrow();
    });
  });

  describe('getUrlToLoad function', () => {
    let ap;
    beforeEach(() => {
      ap = new AircallPhone();
    });
    it('should exists', () => {
      expect(ap.getUrlToLoad).toBeDefined();
    });
  });

  describe('getSetting function', () => {
    let ap;
    beforeEach(() => {
      ap = new AircallPhone();
    });
    it('should exists', () => {
      expect(ap.getSetting).toBeDefined();
    });
  });

  describe('on function', () => {
    let ap;
    beforeEach(() => {
      ap = new AircallPhone();
    });
    it('should exists', () => {
      expect(ap.on).toBeDefined();
    });
  });

  describe('send function', () => {
    let ap;
    beforeEach(() => {
      ap = new AircallPhone();
    });
    it('should exists', () => {
      expect(ap.send).toBeDefined();
    });
  });
});

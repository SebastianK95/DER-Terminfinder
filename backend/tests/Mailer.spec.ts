import { expect } from 'chai';

import { Mailer } from '../src/Mailer/Mailer';
import { MailerContent } from '../src/Mailer/MailerContent';
import { assert } from 'expect';

import * as CONFIG from '../src/config';

describe('/backend/Mailer/Mailer.ts', () => {
  function constructContent() : MailerContent {
    let content = new MailerContent();

    content.from = CONFIG.SMTP_FROM;
    content.to = CONFIG.SMTP_TEST_TO;
    content.subject = CONFIG.SMTP_TEST_SUBJECT;
    content.text = CONFIG.SMTP_TEST_TEXT;
    content.html = CONFIG.SMTP_TEST_HTML;

    return content;
  }

  describe('send()', () => {
    it('should not throw an error when no sender is set', () => {
      let mail = new Mailer();
      let content = constructContent();
      content.from = null;
      expect(() => { mail.send(content) }).to.not.throw();
    });

    it('should throw an error when no receiver is set', () => {
      let mail = new Mailer();
      let content = constructContent();
      content.to = null;
      expect(() => { mail.send(content) }).to.throw(Error);
    });

    it('should throw an error when no subject is set', () => {
      let mail = new Mailer();
      let content = constructContent();
      content.subject = null;
      expect(() => { mail.send(content) }).to.throw(Error);
    });

    it('should not throw an error when no text is set', () => {
      let mail = new Mailer();
      let content = constructContent();
      content.text = null;
      expect(() => { mail.send(content) }).to.not.throw();
    });

    it('should not throw an error when no html is set', () => {
      let mail = new Mailer();
      let content = constructContent();
      content.html = null;
      expect(() => { mail.send(content) }).to.not.throw();
    });

    it('should throw an error when no text and no html is set', () => {
      let mail = new Mailer();
      let content = constructContent();
      content.text = null;
      content.html = null;
      expect(() => { mail.send(content) }).to.throw(Error);
    });

  });
});

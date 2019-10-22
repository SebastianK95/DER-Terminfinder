import { VotingCounterPipe } from './voting-counter.pipe';

describe('VotingCounterPipe', () => {
  it('create an instance', () => {
    const pipe = new VotingCounterPipe();
    expect(pipe).toBeTruthy();
  });
});

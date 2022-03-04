import { jest } from '@jest/globals'

describe('hello', () => {
  it('should compare strings', () => {
    // given:
    const name = 'foo'

    // when/then:
    expect(`hello, ${name}!`).toBe('hello, world!')
  })

  it('should call function with string', () => {
    // given:
    const mock = jest.fn().mockReturnValue((name, _) => {
      return `hello, ${name}!`
    })

    // when:
    mock('foo', 1)
    mock('bar', 2)

    // then:
    expect(mock).toHaveBeenCalledWith('world', 1)
  })
})

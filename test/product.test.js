import { jest } from '@jest/globals'
import z from 'zod'

describe('product', () => {
  // given:
  const product = {
    code: 'product code',
    name: 'product name',
    colorVariants: [
      {
        code: 'color code',
        colorName: 'color name',
        colorGroupName: 'color group name',
        sizeVariants: [
          {
            code: 'size code',
            sizeName: 'size name',
            price: {
              currency: 'usd',
              currentPrice: '12.34',
              originalPrice: null,
            },
          },
          {
            code: 'size code',
            sizeName: 'size name',
            price: null,
            availableQuantity: 0,
          },
        ],
      },
    ],
  }

  it('should compare parsed object', () => {
    // when/then:
    expect(Product.parse(product)).toBe(product)
  })

  it('should call function with parsed object', () => {
    // given:
    const mock = jest.fn().mockReturnValue((_, product) => {
      return product
    })

    // when:
    mock('first', Product.parse(product))
    mock('second', Product.parse(product))

    // then:
    expect(mock).toHaveBeenCalledWith('first', product)
  })
})

export const Product = z.strictObject({
  code: z.string(),
  colorVariants: z.lazy(() => ColorVariant.array().default([])),
  name: z.string(),
  description: z.string().optional(),
  brand: z.string().optional(),
  availableQuantity: z.number().default(0),
})

export const ColorVariant = z.strictObject({
  code: z.string(),
  sizeVariants: z.lazy(() => SizeVariant.array().default([])),
  colorName: z.string(),
  colorGroupName: z.string(),
  availableQuantity: z.number().default(0),
})

export const SizeVariant = z.strictObject({
  code: z.string(),
  price: z.lazy(() => Price.nullable().default(null)),
  sizeName: z.string(),
  availableQuantity: z.number().default(0),
})

export const Price = z.strictObject({
  currency: z.string(),
  currentPrice: z.string(),
  originalPrice: z.string().nullable(),
})

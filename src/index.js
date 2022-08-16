import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'
import { group as icon } from '@wordpress/icons'

import './style.scss'
import './editor.scss'

import Edit from './edit'
import save from './save'
import metadata from './block.json'

registerBlockType(metadata.name, {
    icon,
    example: {
        attributes: {
            tagName: 'div',
        },
        innerBlocks: [
            {
                name: 'core/paragraph',
                attributes: {
                    customTextColor: '#cf2e2e',
                    fontSize: 'large',
                    content: __('One.'),
                },
            },
        ]
    },
    edit: Edit,
    save,
})

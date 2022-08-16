import { PanelBody, TextControl } from '@wordpress/components'
import { useSelect } from '@wordpress/data'
import {
    InnerBlocks,
    InspectorControls,
    store as blockEditorStore,
    useBlockProps,
    useInnerBlocksProps,
    useSetting
} from '@wordpress/block-editor'
import { __ } from '@wordpress/i18n'

export default function Edit({ attributes, setAttributes, clientId }) {
    const blockProps = useBlockProps()
    const defaultLayout = useSetting('layout') || {}
    const { tagName = 'div', templateLock, layout = {} } = attributes
    const TagName = tagName === '' ? 'div' : tagName
    const usedLayout = !!layout && layout.inherit ? defaultLayout : layout

    const { hasInnerBlocks, themeSupportsLayout } = useSelect(
        (select) => {
            const { getBlock, getSettings } = select(blockEditorStore)
            const block = getBlock(clientId)
            return {
                hasInnerBlocks: !!(block && block.innerBlocks.length),
                themeSupportsLayout: getSettings()?.supportsLayout,
            }
        },
        [clientId]
    )

    const { type = 'default' } = usedLayout
    const layoutSupportEnabled = themeSupportsLayout || type !== 'default'

    const innerBlocksProps = useInnerBlocksProps(
        layoutSupportEnabled ? blockProps : {
            className: ''
        },
        {
            templateLock,
            renderAppender: hasInnerBlocks
                ? undefined
                : InnerBlocks.ButtonBlockAppender,
            __experimentalLayout: layoutSupportEnabled ? usedLayout : undefined,
        }
    )

    return (
        <>
            <InspectorControls>
                <PanelBody>
                    <TextControl
                        label={__('HTML element')}
                        value={tagName}
                        onChange={(value) =>
                            setAttributes({ tagName: value })
                        }
                    />
                </PanelBody>
            </InspectorControls>
            <TagName {...innerBlocksProps} />
        </>
    )
}

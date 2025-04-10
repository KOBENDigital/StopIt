import { ManifestPropertyEditorUi } from '@umbraco-cms/backoffice/property-editor';

const propertyEditors: Array<ManifestPropertyEditorUi> = [
	{
		type: 'propertyEditorUi',
		alias: 'our.UDUF.StopId',
		name: 'UDUF StopId',
		element: () => import('./uduf-stopit.element'),
		meta: {
			label: "UDUF Protect",
			propertyEditorSchemaAlias: "Umbraco.Plain.Json",
			icon: "icon-code",
			group: "security",
			settings: {
				properties: [
				//	{
				//		label: "Title / Description fields for search",
				//		description: "Show the Title and Description fields to the editor",
				//		alias: "showSearchFields",
				//		propertyEditorUiAlias: "Umb.PropertyEditorUi.Toggle",
				//	}
				],
				defaultData: [
					//{
					//	alias: "showSearchFields",
					//	value: true,
					//},
					//{
					//	alias: "showSearchPreviewGoogle",
					//	value: true,
					//},
					//{
					//	alias: "showNoIndexdOption",
					//	value: true,
					//},
					//{
					//	alias: "showSocialFields",
					//	value: true,
					//},
					//{
					//	alias: "showSocialPreviewFacebook",
					//	value: true,
					//},
					//{
					//	alias: "showSocialPreviewTwitter",
					//	value: true,
					//},
					//{
					//	alias: "showSocialPreviewLinkedIn",
					//	value: true,
					//},
					//{
					//	alias: "fallbackTitleFields",
					//	value: "title,pageTitle,name",
					//},
					//{
					//	alias: "fallbackDescriptionFields",
					//	value: "description,desc",
					//},
					//{
					//	alias: "fallbackImageFields",
					//	value: "featureImage,heroImage,mainImage",
					//},
				]
			}
		},
	}
];

export const manifests = [...propertyEditors];
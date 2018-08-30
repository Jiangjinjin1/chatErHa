import {uploadFile as fetchApi} from '../config/fetch'

export const uploadAvatar = async ({
	formData = new FormData()
}) => {
	const uploadResult = await fetchApi({
		url: '/admin/uploadAvatar',
		data: formData
	})

	return uploadResult
}

export default {}

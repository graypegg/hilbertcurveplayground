export interface FailedResponse {
    success: false,
    message: string
}

export interface SuccessfulResponse<DataType> {
    success: true,
    data: DataType
}

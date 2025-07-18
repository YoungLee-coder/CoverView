import React from "react";
import CoverImage from "./CoverImage";
import ComponentToImg from "./ComponentToImg";
import Select from 'react-select';
import RandomTheme from './RandomTheme';
import { ImgProvider } from '../utils/ImgContext'
import Header from "./Header";
import { useLanguage } from '../utils/i18n';


import { THEMES } from "../utils/constants";

const defaultIcon = { 'label': 'react', 'value': 'react' }

const defaultSettings = {
	title: "A beginners guide to frontend development",
	bgColor: "#949ee5",
	pattern: "",
	download: "PNG",
	author: 'Rutik Wankhade',
	icon: defaultIcon,
	devIconOptions: [defaultIcon],
	font: 'font-Anek',
	theme: 'background',
	customIcon: '',
	platform: 'hashnode'
};

const devIconsUrl = "https://raw.githubusercontent.com/devicons/devicon/master/devicon.json"

class Editor extends React.Component {
	state = defaultSettings;
	
	componentDidMount() {
		// console.log("Mount")
		fetch(devIconsUrl).then(r => r.json()).then(data => {
			data.unshift({ name: 'upload your own' })
			this.setState({ devIconOptions: data.map(item => ({ 'value': item.name, 'label': item.name })) })
		})
	}
	
	handleReset = () => {
		this.setState({
			...defaultSettings,
			devIconOptions: this.state.devIconOptions,
		});
	};

	getRandomTheme = (theme, Pattern) => {
		this.setState({ bgColor: theme.bgColor, borderColor: theme.bdColor, pattern: Pattern });
	}

	formatOptionLabel = ({ value, label }) => (
		<div className="flex">
			<span className="mr-2">{label}</span>
			<div className="ml-auto mr-2">
				<i className={`devicon-${value}-plain dev-icon text-2xl`}></i>
			</div>
		</div>
	);

	render() {
		// 由于类组件无法直接使用钩子，我们在render方法中使用内联组件
		return (
			<EditorWithLanguage 
				state={this.state}
				handleReset={this.handleReset}
				formatOptionLabel={this.formatOptionLabel}
				getRandomTheme={this.getRandomTheme}
				onStateChange={(newState) => this.setState(newState)}
			/>
		);
	}
}

// 包装函数组件来使用语言钩子
const EditorWithLanguage = (props) => {
	const { t } = useLanguage();
	const { state, handleReset, formatOptionLabel, getRandomTheme, onStateChange } = props;

	return (
		<div className="max-w-[1400px]  mx-auto">
			<Header />

			<ImgProvider>
				<div className="flex md:flex-row flex-col  ">
					<div className="bg-white flex flex-col h-100 md:w-3/12">
						<div>
							<div className="flex md:flex-row flex-col">
								<div className="bg-white font-Inter  border-dashed border-r-2 border-gray-100 w-full p-4 ">
									<div>
										<div className="m-2 flex flex-col">
											<span className="font-medium text-sm pb-1">{t('blogTitle')}</span>
											<textarea
												type="text"
												value={state.title}
												placeholder={t('enterTitle')}
												className="focus:outline-none border text-gray-700 text-lg  rounded p-2 h-24"
												onChange={(e) => onStateChange({ title: e.target.value })}
											/>
										</div>

										<div className="flex flex-col m-2 ">
											<span className="font-medium text-sm pb-1">{t('author')}</span>
											<input
												type="text"
												value={state.author}
												placeholder={t('author')}
												className="focus:outline-none border text-gray-700 text-lg rounded bg-white p-2"
												onChange={(e) => onStateChange({ author: e.target.value })}
											></input>
										</div>

										<div className="flex flex-col m-2 ">
											<span className="font-medium text-sm pb-1">{t('icon')}</span>
											<Select value={state.icon}
												onChange={(selectedOption) => onStateChange({ icon: selectedOption })}
												options={state.devIconOptions}
												formatOptionLabel={formatOptionLabel}
												className="outline-none focus:outline-none items-center text-lg text-gray-700"
											/>
										</div>
										<div className="w-full">
											{state.icon.label === 'upload your own' ?
												<div className="flex items-center justify-center w-64 mx-auto">
													<input type="file"
														className="focus:outline-none w-full text-sm cursor-pointer bg-white rounded border"
														onChange={(e) => onStateChange({ 'customIcon': URL.createObjectURL(e.target.files[0]) })}
													/>
												</div>
												:
												<div></div>
											}
										</div>

										<div className="flex items-center">
											<div className="flex flex-col m-2 w-1/2">
												<span className="font-medium text-sm pb-1">{t('font')}</span>
												<select
													value={state.font}
													onChange={(e) => onStateChange({ font: e.target.value })}
													className="focus:outline-none text-gray-700 text-lg p-2 rounded border">
													<option>font-serif</option>
													<option>font-sans</option>
													<option>font-mono</option>
													<option>font-Inter</option>
													<option>font-Poppins</option>
													<option>font-Anek</option>
												</select>
											</div>
											<div className="flex flex-col m-2 w-1/2">
												<span className="font-medium text-sm pb-1">{t('color')}</span>
												<div className="border rounded flex items-center p-1">
													<input type="color" value={state.bgColor}
														onChange={(e) => onStateChange({ bgColor: e.target.value })}
														className="h-8 w-full  rounded"
													/>
												</div>
											</div>
										</div>

										<div className="flex items-center">
											<div className="flex flex-col m-2 w-full">
												<span className="font-medium text-sm pb-1">{t('platform')}</span>
												<select
													onChange={(e) => onStateChange({ platform: e.target.value })}
													value={state.platform}
													className="focus:outline-none text-gray-700 text-lg p-2 rounded border">
													<option>hashnode</option>
													<option>dev</option>
												</select>
											</div>
										</div>

										<button
											className="flex items-center bg-gray-700 hover:bg-gray-800 text-white rounded-lg mt-6 text-base  p-1 px-4 mx-auto border"
											onClick={handleReset}>
											<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white mr-2 " fill="currentColor" viewBox="0 0 24 24" ><path d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3-3 1.331-3 3 1.329 3 3 3z"></path><path d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219 9.053 9.053 0 0 0-2.43-2.43 8.95 8.95 0 0 0-3.219-1.355 9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053 7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725 7.11 7.11 0 0 1-.644 1.188 7.2 7.2 0 0 1-.858 1.039 7.028 7.028 0 0 1-3.536 1.907 7.13 7.13 0 0 1-2.822 0 6.961 6.961 0 0 1-2.503-1.054 7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034 9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183 9.014 9.014 0 0 0 3.218-1.355 8.886 8.886 0 0 0 1.331-1.099 9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814z"></path></svg>
											<span className="font-Inter">{t('resetAll')}</span>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* cover image preview */}
					<div className=" flex m-2 flex-col items-center justify-center ">
						<ComponentToImg downloadAs={state.download}>
							<CoverImage {...state} />
						</ComponentToImg>
					</div>

					{/* themes section */}
					<div className="md:w-60 px-4 border-dashed border-l-2 border-gray-100 bg-white">
						<div className="h-99 w-full flex flex-col justify-center">
							<div className="flex items-center">
								<h2 className="text-lg pl-2 font-inter font-semibold">{t('themes')}</h2>
								<div className="ml-auto mr-1 p-2">
									<RandomTheme onThemeChange={getRandomTheme} />
								</div>
							</div>
							
							<div className="flex gap-2 flex-wrap justify-center overflow-y-scroll">
								{
									THEMES.map(themePlaceholder => (
										<div className={`${themePlaceholder.label === state.theme ? 'border-blue-400 border-2' : ''}`} key={themePlaceholder.label}>
											<img src={themePlaceholder.preview} alt={themePlaceholder.label}
												onClick={(e) => onStateChange({ theme: themePlaceholder.label })}
												className="cursor-pointer border border-gray-100 hover:border-gray-200 hover:scale-105 duration-300"
											/>
										</div>
									))
								}
							</div>
						</div>
					</div>
				</div>
			</ImgProvider>
		</div>
	);
};

export default Editor;

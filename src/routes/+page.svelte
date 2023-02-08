<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { ActionData} from './$type'
	export let form: ActionData

	let loading = false
	const submitForm: SubmitFunction = () => {
		loading = true
		return async ({ update}) => {
			update()
			loading = false
		}
	}
</script>
<div class="mx-auto max-w-2xl">
	<h1 class="text-4xl font-extrabold leadin-none tracking-tight text-gray-50">Bienvenido a ItenerarIA</h1>

	<form method="POST" action="/" use:enhance={submitForm}>
		<div class="col-span-3 sm:col-span-2 pt-10">
			<label for="company-website" class="block text-sm font-medium text-gray-100"
				>¿donde viajas?</label
			>
			<div class="mt-1 flex rounded-md shadow-sm">
				<input
					type="text"
					name="location"
					id="location"
					class="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					placeholder=""
					required
				/>
			</div>
		</div>
		<div class="col-span-3 sm:col-span-2 flex flex-row justify-between pt-10">
			<label for="company-website" class="block text-sm font-medium text-gray-100"
				>¿Viajas en Familia?</label
			>
			<div class="mt-1 flex rounded-md shadow-sm">
				<input
					id="family"
					name="family"
					type="checkbox"
					class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
				/>
			</div>
		</div>
		<div class="col-span-3 sm:col-span-2 flex flex-row justify-between pt-10">
			<label for="company-website" class="block text-sm font-medium text-gray-100"
				>¿Con niños pequeños?</label
			>
			<div class="mt-1 flex rounded-md shadow-sm">
				<input
					id="kids"
					name="kids"
					type="checkbox"
					class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
				/>
			</div>
		</div>
		<div class="col-span-3 sm:col-span-2 pt-10">
			<label for="company-website" class="block text-sm font-medium text-gray-100"
				>¿Cuántas noches?</label
			>
			<div class="mt-1 flex rounded-md shadow-sm">
				<input
					type="text"
					name="days"
					id="days"
					class="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					placeholder=""
					required
				/>

			</div>
		</div>
		<div class="col-span-3 sm:col-span-2 flex flex-row justify-between pt-10">
			<fieldset>
              <legend class="contents text-base font-medium text-gray-900">¿QUé experiencias buscas?</legend>
              <div class="mt-4 space-y-4">
                <div class="flex items-center">
                  <input id="nature" name="experiences" type="checkbox" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" value="nature">
                  <label for="nature" class="ml-3 block text-sm font-medium text-gray-100">Naturaleza</label>
                </div>
                <div class="flex items-center">
                  <input id="beach"name="experiences" type="checkbox" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" value="beach">
                  <label for="beach" class="ml-3 block text-sm font-medium text-gray-100">Playa</label>
                </div>
                <div class="flex items-center">
                  <input id="mountains"name="experiences" type="checkbox" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" value="mountains">
                  <label for="mountains" class="ml-3 block text-sm font-medium text-gray-100">Montaña</label>
                </div>

                <div class="flex items-center">
                  <input id="party"name="experiences" type="checkbox" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" value="party">
                  <label for="party" class="ml-3 block text-sm font-medium text-gray-100">Fiesta</label>
                </div>
                <div class="flex items-center">
                  <input id="gastronomic"name="experiences" type="checkbox" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" value="gastronomic">
                  <label for="gastronomic" class="ml-3 block text-sm font-medium text-gray-100">Gastronomía</label>
                </div>
			
                <div class="flex items-center">
                  <input id="romantic"name="experiences" type="checkbox" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" value="romantic">
                  <label for="romantic" class="ml-3 block text-sm font-medium text-gray-100">Romántica</label>
                </div>
                <div class="flex items-center">
                  <input id="adventure" name="experiences" type="checkbox" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" value="adventure">
                  <label for="adventure" class="ml-3 block text-sm font-medium text-gray-100">Aventura</label>
                </div>
                <div class="flex items-center">
                  <input id="sports" name="experiences" type="checkbox" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" value="sports">
                  <label for="sports" class="ml-3 block text-sm font-medium text-gray-100">Deporte</label>
                </div>
              </div>
            </fieldset>
		</div>

		<div class="col-span-3 sm:col-span-2 pt-10">
			<label for="company-website" class="block text-sm font-medium text-gray-100"
				>¿Tu email?</label
			>
			<div class="mt-1 flex rounded-md shadow-sm">
				<input
					type="text"
					name="email"
					id="email"
					class="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					placeholder=""
				/>
			</div>
		</div>
		<div class="px-4 py-3 text-right sm:px-6">
			<button
				type="submit"
				class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>Obtén tu Itinerario</button
			>
		</div>
	</form>
	<div class="pt-20 border-indigo-100 border rounded-md bg-indigo-200 prose prose-lg">
		{#if loading} 
			<p>Pensando...Se demora un tiempo, ten paciencia</p> 
		{/if}
	{#if form?.success}
		
		{@html form.result}
	{/if}
	</div>

</div>

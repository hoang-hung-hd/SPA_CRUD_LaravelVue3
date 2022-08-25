<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use phpDocumentor\Reflection\DocBlock\Tags\Uses;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller as Controller;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $limit = $request->all()['limit'];
        $users = User::latest()->paginate($limit);
        //$users = User::all();
        return response()->json($users);  

        // $users = User::latest()->paginate(5);
        // return view('user.index',compact('users'))
            // ->with('i', (request()->input('page', 1) - 1) * 5);
            
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // return view('user.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = new User([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            //'password' => $request->input('password'),
            'password' => encrypt($request->input('password'))
        ]);
        $user->save();
        return response()->json('User created!');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);
        return response()->json($user);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        return view('user.edit',compact('user'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
         //validate post data
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required',
        ]);
        $input = $request->all();
        $input['name'] = $request['name'];
        $input['email'] = $request['email'];
        $input['password'] = encrypt($request['password']); //
        //$input['password'] = Hash::make($request['password']);
        User::find($id)->update($input);

        // $user = User::find($id);
        // $user->update($request->all());
        return response()->json('User updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
        return response()->json('User deleted!');
    }
}
